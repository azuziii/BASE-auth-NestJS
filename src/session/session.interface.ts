import { User } from 'src/user/entities/user.entity';
import { Session } from './entities/session.entity';

export const ISession = 'ISession';
export interface ISession {
  generate(): string;
  genereateAndSave(user: User): Promise<Session>;
  verify(session_token: string): Promise<boolean>;
}
