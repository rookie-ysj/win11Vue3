// src/interceptors/transform.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor<T>
implements NestInterceptor<T, { data: T, code: number, message: string }> {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(data => ({
        data,
        code: 200,
        message: 'Success',
      })),
    )
  }
}
