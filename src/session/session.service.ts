import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { BaseService } from 'src/shared/base/base.service';
import { Session } from './entities/session.entity';
import * as crypto from 'crypto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClsService } from 'nestjs-cls';
import { USER_AGENT_SYMBOL, USER_IP_SYMBOL } from 'src/user/constants';
import { ISession } from './session.interface';

@Injectable()
export class SessionService
  extends BaseService<Session, CreateSessionDto, never>
  implements ISession
{
  constructor(
    @InjectRepository(Session)
    protected readonly repository: Repository<Session>,
    private readonly cls: ClsService,
  ) {
    super(repository);
  }

  generate(): string {
    return crypto.randomBytes(16).toString('base64');
  }

  genereateAndSave(user: User): Promise<Session> {
    const token = this.generate();

    return this.save({
      expires_at: new Date(Date.now() + 3600 * 24 * 30),
      ip: this.cls.get(USER_IP_SYMBOL),
      user_agent: this.cls.get(USER_AGENT_SYMBOL),
      session_token: token,
      user,
    });
  }

  async isExpired(session_token: string): Promise<boolean> {
    try {
      const session = await this.findOne({ session_token });
      return session.isActive();
    } catch {
      return true;
    }
  }
  async verify(session_token: string): Promise<boolean> {
    const isExpired = await this.isExpired(session_token);
    console.log('isExpired');
    console.log(isExpired);

    return isExpired;
  }
}
