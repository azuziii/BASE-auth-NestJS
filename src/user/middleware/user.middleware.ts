import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { SESSION_TOKEN } from 'src/session/constants';
import { IUser } from '../user.interface';
import { User } from '../entities/user.entity';
import { ClsService } from 'nestjs-cls';
import { USER_AGENT_SYMBOL, USER_IP_SYMBOL, USER_SYMBOL } from '../constants';
import { ISession } from 'src/session/session.interface';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @Inject(IUser) private readonly userService: IUser,
    @Inject(ISession) private readonly sessionService: ISession,
    private readonly cls: ClsService,
  ) {}
  async use(req: Request, res: any, next: () => void) {
    const sessionToken = req.cookies[SESSION_TOKEN];
    let user: User | null = null;

    const isSessionValid = await this.sessionService.verify(sessionToken);

    if (isSessionValid) {
      user = await this.userService.findOne({
        where: { sessions: { session_token: sessionToken } },
      });

      this.cls.set(SESSION_TOKEN, sessionToken);
    }

    this.cls.set(USER_SYMBOL, user);
    this.cls.set(USER_IP_SYMBOL, req.ip);
    this.cls.set(USER_AGENT_SYMBOL, req.headers['user-agent']);

    req['user'] = user;

    console.log('user');
    console.log(user);

    next();
  }
}
