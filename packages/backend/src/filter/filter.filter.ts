import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = exception.status ?? 500

    response.status(status).json({
      code: status,
      message: exception.message || 'Internal server error',
      data: response.data,
    })
  }
}
