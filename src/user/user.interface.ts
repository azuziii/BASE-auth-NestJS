import { User } from './entities/user.entity';

export const IUser = 'IUser';
export interface IUser {
  findByUsername(username: string): Promise<User>;
}
