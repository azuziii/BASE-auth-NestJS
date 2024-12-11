import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { PUBLIC } from 'src/shared/decorators/public.decorator';
import { SESSION_TOKEN } from 'src/session/constants';
import { ISession } from 'src/session/session.interface';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(@Inject(ISession) private readonly sessionService: ISession) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = Reflect.getMetadata(PUBLIC, context.getHandler());

    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();

    const sessionToken = request.cookies[SESSION_TOKEN];
    console.log(sessionToken);

    if (!sessionToken) return false;

    return this.sessionService.verify(sessionToken);
  }
}
