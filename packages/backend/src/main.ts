import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ErrorFilter } from './filter/filter.filter'
import { TransformInterceptor } from './interceptor/transformer.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new ErrorFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  const config = new DocumentBuilder()
    .setTitle('文件系统 API 文档')
    .setDescription('NestJS + Prisma 示例接口')
    .setVersion('1.0')
    .addTag('File')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document) // 访问地址为 /api-docs

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true - 会自动剔除 DTO 中未定义的属性
      whitelist: true,
      // forbidNonWhitelisted: true - 如果请求中存在 DTO 未定义的属性，则抛出错误
      forbidNonWhitelisted: true,
      // transform: true - 自动将 payload 转换为 DTO 类的实例
      transform: true,
      // disableErrorMessages: false - 生产环境可以设为 true，隐藏详细错误信息
      disableErrorMessages: false,
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
