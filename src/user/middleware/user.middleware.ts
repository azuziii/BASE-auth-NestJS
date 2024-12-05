import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { SESSION_TOKEN } from 'src/session/constants';
import { IUser } from '../user.interface';
import { User } from '../entities/user.entity';
import { ClsService } from 'nestjs-cls';
import { USER_AGENT_SYMBOL, USER_IP_SYMBOL, USER_SYMBOL } from '../constants';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @Inject(IUser) private readonly iUser: IUser,
    private readonly cls: ClsService,
  ) {}
  async use(req: Request, res: any, next: () => void) {
    const sessionToken = req.signedCookies[SESSION_TOKEN];
    let user: User | null = null;

    if (sessionToken) {
      user = await this.iUser.findOne({
        sessions: { session_token: sessionToken },
      });
    }

    this.cls.set(USER_SYMBOL, user);
    this.cls.set(USER_IP_SYMBOL, req.ip);
    this.cls.set(USER_AGENT_SYMBOL, req.headers['user-agent']);

    req['user'] = user;

    next();
  }
}
