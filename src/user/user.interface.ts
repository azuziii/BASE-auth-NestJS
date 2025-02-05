import { FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export const IUser = 'IUser';
export interface IUser {
  save(createDto: CreateUserDto): Promise<User>;
  findOne(options: FindOneOptions<User>): Promise<User>;
  findByUsername(username: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  isVerified(): boolean;
}
