import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/shared/base/base.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from './user.interface';

@Injectable()
export class UserService
  extends BaseService<User, CreateUserDto, UpdateUserDto>
  implements IUser
{
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  findByUsername(username: string): Promise<User> {
    return this.repository.findOne({
      where: { username },
    });
  }
}
