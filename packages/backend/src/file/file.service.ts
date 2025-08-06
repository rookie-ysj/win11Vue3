import { Injectable } from '@nestjs/common'
import { $Enums, Node, Prisma } from '../../generated/prisma'
import { PrismaService } from '../prisma/prisma.service'
import fileStatus = $Enums.fileStatus

export type FileEntity = Pick<Node, 'id' | 'name' | 'parent_id' | 'type' | 'created_at' | 'updated_at'>

export interface Tree extends FileEntity {
  children: Tree[]
}

const selectData: Record<keyof FileEntity, boolean> = {
  id: true,
  name: true,
  parent_id: true,
  type: true,
  created_at: true,
  updated_at: true,
}

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async createNode(data: Prisma.NodeCreateInput): Promise<Node> {
    return this.prisma.node.create({
      data,
    })
  }

  async findAll(id: number): Promise<Tree> {
    const nodes = await this.prisma.node.findMany({
      where: {
        status: fileStatus.NORMAL,
      },
      select: selectData,
    })
    const map = new Map<number, FileEntity[]>()
    let current: Tree
    nodes.forEach((node) => {
      if (!current && node.id === id) {
        current = {
          ...node,
          children: [],
        }
      }
      if (map.has(node.parent_id)) {
        map.get(node.parent_id)!.push(node)
      }
      else {
        map.set(node.parent_id, [node])
      }
    })
    const dfs = async (node: Tree) => {
      const children = map.get(node.id) ?? []
      node.children = await Promise.all(children.map(async child => await dfs(child as Tree)))
      return node
    }
    return dfs(current!)
  }

  async findOne(id: number): Promise<Partial<Node> | null> {
    return this.prisma.node.findUnique({
      where: {
        id,
        status: fileStatus.NORMAL,
      },
      select: selectData,
    })
  }

  async findAncestors(id: number): Promise<Partial<Node>[]> {
    const ancestors: Partial<Node>[] = []

    let current = await this.prisma.node.findUnique({
      where: { id },
      select: selectData,
    })

    while (current) {
      ancestors.push(current)
      current = await this.prisma.node.findUnique({
        where: {
          id: current.parent_id,
          status: fileStatus.NORMAL,
        },
        select: selectData,
      })
    }

    return ancestors.reverse() // 如果你想从根 -> 当前节点
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.prisma.node.updateMany({
      where: {
        id,
        can_delete: true, // 注意逻辑是否相反
      },
      data: {
        status: fileStatus.DELETED,
      },
    })

    return result.count > 0
  }
}
