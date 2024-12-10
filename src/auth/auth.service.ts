import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { IUser } from 'src/user/user.interface';
import * as bcrypt from 'bcrypt';
import { ISession } from 'src/session/session.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IAuth } from './auth.interface';
import { IOtp } from 'src/core/otp/otp.interface';
import { OtpType } from 'src/core/otp/enums/otp-type.enum';
import { ClsService } from 'nestjs-cls';
import { USER_SYMBOL } from 'src/user/constants';
import { SESSION_TOKEN } from 'src/session/constants';

@Injectable()
export class AuthService implements IAuth {
  constructor(
    private readonly cls: ClsService,
    @Inject(IUser) private readonly userService: IUser,
    @Inject(ISession) private readonly sessionService: ISession,
    @Inject(IOtp) private readonly otpService: IOtp,
  ) {}

  async login({ username }: LoginDto): Promise<string> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new BadRequestException('Username or password is incorrect');
    }
    const sessionTokn = await this.sessionService.genereateAndSave(user);
    this.cls.set(SESSION_TOKEN, sessionTokn.session_token);

    return sessionTokn.session_token;
  }

  async register({ email, username, password }: RegisterDto): Promise<string> {
    const isUsernameTaken = await this.userService.findByUsername(username);
    if (isUsernameTaken) {
      throw new BadRequestException('Username taken');
    }

    const isEmailTaken = await this.userService.findByEmail(email);
    if (isEmailTaken) {
      throw new BadRequestException('Email taken');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = await this.userService.save({
      email,
      username,
      password: hashedPassword,
    });

    this.cls.set(USER_SYMBOL, user);

    const sessionToken = await this.login({ username, password });

    await this.otpService.saveAndSend(OtpType.ACTIVATE_ACCOUNT);

    return sessionToken;
  }

  async logout() {
    const sessionToken = this.cls.get<string>(SESSION_TOKEN);
    await this.sessionService.invalidate(sessionToken);
    return '';
  }

  async verifyOTP(otp: string): Promise<void> {
    const isValid = await this.otpService.verify(otp, OtpType.ACTIVATE_ACCOUNT);

    if (!isValid) {
      // fix
      throw new BadRequestException('Bad otp');
    }

    const user = this.cls.get<User>(USER_SYMBOL);

    user.setAccountVerified();

    await this.userService.save(user);

    return;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ where: { username } });
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) return null;
      return user;
    }
    return null;
  }
}
