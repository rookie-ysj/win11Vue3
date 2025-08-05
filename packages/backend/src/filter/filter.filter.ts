import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

@Catch()
export class ErrorFilter<T = any> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const res = exception.getResponse()
      if (typeof res === 'string') {
        message = res
      }
      else if (typeof res === 'object' && res !== null && 'message' in res) {
        message = (res as any).message
      }
    }
    else if (
      typeof exception === 'object'
      && exception !== null
      && 'message' in exception
    ) {
      message = (exception as any).message
    }

    response.status(status).json({
      code: status,
      message,
      data: null,
    })
  }
}
