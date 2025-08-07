import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateNodeDto } from './dto/createNode.dto'
import { FileEntity, TreeEntity } from './entity/file.entity'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: '获取文件列表' })
  @ApiResponse({
    status: 200,
    isArray: false,
    description: '返回所有文件',
    type: TreeEntity,
  })
  @Get('/children/:id')
  findAll(@Param('id') id: number) {
    return this.fileService.findAll(id)
  }

  @ApiResponse({
    status: 200,
    description: '返回当前文件信息',
    type: FileEntity,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fileService.findOne(id)
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    description: '返回所有祖先',
    type: FileEntity,
  })
  @Get('/ancestors/:id')
  findAncestors(@Param('id') id: number) {
    return this.fileService.findAncestors(id)
  }

  @Post('/create')
  create(@Body() createNodeDto: CreateNodeDto) {
    return this.fileService.createNode(createNodeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fileService.remove(id)
  }
}
