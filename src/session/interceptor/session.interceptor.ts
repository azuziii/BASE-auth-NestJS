import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response } from 'express';
import { SET_COOKIE_METADATA } from '../decorators/set-session.decorator';
import { CLEAR_COOKIE_METADATA } from '../decorators/clear-session.decorator';

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const setSessionTokenData = Reflect.getMetadata(
      SET_COOKIE_METADATA,
      context.getHandler(),
    );

    const clearSessionTokenData = Reflect.getMetadata(
      CLEAR_COOKIE_METADATA,
      context.getHandler(),
    );

    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((sessionToken: string) => {
        if (setSessionTokenData) {
          if (sessionToken) {
            response.cookie(
              setSessionTokenData.name,
              sessionToken,
              setSessionTokenData.options,
            );
          } else if (clearSessionTokenData) {
            response.clearCookie(
              clearSessionTokenData.name,
              clearSessionTokenData.options,
            );
          }
        }
      }),
    );
  }
}
