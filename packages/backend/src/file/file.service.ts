import { Injectable } from '@nestjs/common'
import { Node, Prisma } from '../../generated/prisma'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async createNode(data: Prisma.NodeCreateInput): Promise<Node> {
    return this.prisma.node.create({
      data,
    })
  }

  async findAll(id: number): Promise<Node[]> {
    return this.prisma.node.findMany({
      where: {
        parent_id: id,
      },
    })
  }

  async findOne(id: number): Promise<Node | null> {
    return this.prisma.node.findUnique({
      where: {
        id,
      },
    })
  }

  async findAncestors(id: number): Promise<Node[]> {
    const ancestors: Node[] = []

    let current = await this.prisma.node.findUnique({
      where: { id },
    })

    while (current?.parent_id) {
      ancestors.push(current)
      current = await this.prisma.node.findUnique({
        where: { id: current.parent_id },
      })
    }

    return ancestors.reverse() // 如果你想从根 -> 当前节点
  }

  async remove(id: number): Promise<Node> {
    return this.prisma.node.delete({
      where: {
        id,
      },
    })
  }
}
