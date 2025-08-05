import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { $Enums } from '../../../generated/prisma'
import NodeType = $Enums.NodeType

export class CreateNodeDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  parent_id: number

  @ApiProperty({
    enum: NodeType,
    description: '文件类型: FILE | DIRECTORY',
  })
  @IsEnum(NodeType)
  @IsNotEmpty()
  type: NodeType
}
