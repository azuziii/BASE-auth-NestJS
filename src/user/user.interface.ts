import { FindOptionsWhere } from 'typeorm';
import { User } from './entities/user.entity';

export const IUser = 'IUser';
export interface IUser {
  findOne(whereOptions?: FindOptionsWhere<User>): Promise<User>;
  findByUsername(username: string): Promise<User>;
}
