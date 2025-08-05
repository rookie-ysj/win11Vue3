import { ApiProperty } from '@nestjs/swagger'
import { $Enums } from '../../../generated/prisma'
import NodeType = $Enums.NodeType

export class FileEntity {
  id: number
  name: string
  parent_id: number
  @ApiProperty({
    enum: NodeType,
    description: '文件类型: FILE | DIRECTORY',
  })
  type: NodeType

  created_at: Date
  updated_at: Date
}
