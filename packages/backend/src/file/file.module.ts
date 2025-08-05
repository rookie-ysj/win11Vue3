import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
  imports: [PrismaModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
