import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { SESSION_TOKEN } from 'src/session/constants';

@Injectable()
export class AlreadyLoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    if (request.user && request.cookies[SESSION_TOKEN]) {
      throw new HttpException(
        'User is already logged in',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
