import { Injectable } from '@nestjs/common'
import { $Enums, Node, Prisma } from '../../generated/prisma'
import { PrismaService } from '../prisma/prisma.service'
import fileStatus = $Enums.fileStatus

const selectData = {
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

  async findAll(id: number): Promise<Partial<Node>[]> {
    return this.prisma.node.findMany({
      where: {
        parent_id: id,
        status: fileStatus.NORMAL,
      },
      select: selectData,
    })
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

    while (current?.parent_id) {
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
