import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { SET_COOKIE_METADATA } from '../decorators/set-session.decorator';
import { Response } from 'express';

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const sessionTokenData = Reflect.getMetadata(
      SET_COOKIE_METADATA,
      context.getHandler(),
    );

    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((sessionToken: string) => {
        if (sessionTokenData && sessionToken) {
          response.cookie(
            sessionTokenData.name,
            sessionToken,
            sessionTokenData.options,
          );
        }
      }),
    );
  }
}
