import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/shared/base/base.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from './user.interface';
import { USER_SYMBOL } from './constants';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class UserService
  extends BaseService<User, CreateUserDto, UpdateUserDto>
  implements IUser
{
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
    private readonly cls: ClsService,
  ) {
    super(repository);
  }

  findByUsername(username: string): Promise<User> {
    return this.repository.findOne({
      where: { username },
    });
  }

  findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }

  isVerified(): boolean {
    const user = this.cls.get<User>(USER_SYMBOL);
    return user.is_verified;
  }
}
