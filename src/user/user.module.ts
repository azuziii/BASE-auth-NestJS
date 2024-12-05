import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUser } from './user.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IUser,
      useExisting: UserService,
    },
  ],
  exports: [IUser],
})
export class UserModule {}
