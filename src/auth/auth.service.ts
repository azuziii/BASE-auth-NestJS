import { BadRequestException, Body, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { IUser } from 'src/user/user.interface';
import * as bcrypt from 'bcrypt';
import { ISession } from 'src/session/session.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IAuth } from './auth.interface';
import { ResponseDto } from 'src/core/types/response.dto';

@Injectable()
export class AuthService implements IAuth {
  constructor(
    @Inject(IUser) private readonly userService: IUser,
    @Inject(ISession) private readonly sessionService: ISession,
  ) {}

  async login({ username }: LoginDto): Promise<string> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('Username or password is incorrect');
    }
    const sessionTokn = await this.sessionService.genereateAndSave(user);
    return sessionTokn.session_token;
  }

  async register({
    email,
    username,
    password,
  }: RegisterDto): Promise<ResponseDto> {
    const isUsernameTaken = await this.userService.findByUsername(username);
    if (isUsernameTaken) {
      throw new BadRequestException('Username taken');
    }

    const isEmailTaken = await this.userService.findByEmail(email);
    if (isEmailTaken) {
      throw new BadRequestException('Email taken');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.userService.save({
      email,
      username,
      password: hashedPassword,
    });

    return { message: 'Please check your email to confirm your registration.' };

    return this.login({ username, password });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ username });
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) return null;
      return user;
    }
    return null;
  }
}
