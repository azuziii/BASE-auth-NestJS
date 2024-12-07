import { User } from 'src/user/entities/user.entity';

export const IAuth = 'IAuth';
export interface IAuth {
  validateUser(username: string, pass: string): Promise<User>;
}
