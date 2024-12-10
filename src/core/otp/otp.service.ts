import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { BaseService } from 'src/shared/base/base.service';
import { Otp } from './entities/otp.entity';
import { User } from 'src/user/entities/user.entity';
import { ClsService } from 'nestjs-cls';
import {
  USER_AGENT_SYMBOL,
  USER_IP_SYMBOL,
  USER_SYMBOL,
} from 'src/user/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpType } from './enums/otp-type.enum';
import { IOtp } from './otp.interface';
import { SESSION_TOKEN } from 'src/session/constants';
import { IMailVerification } from '../mail/mail-verification.interface';

@Injectable()
export class OtpService
  extends BaseService<Otp, CreateOtpDto, UpdateOtpDto>
  implements IOtp
{
  constructor(
    @InjectRepository(Otp) protected readonly repository: Repository<Otp>,
    @Inject(IMailVerification) private readonly mailService: IMailVerification,
    private readonly cls: ClsService,
  ) {
    super(repository);
  }

  generate(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  send() {}

  // make interceptor for ip and user agent
  // invlidate old otps when new one requested
  async saveAndSend(type: OtpType): Promise<void> {
    const ip = this.cls.get(USER_IP_SYMBOL);
    const userAgent = this.cls.get(USER_AGENT_SYMBOL);
    const user = this.cls.get<User>(USER_SYMBOL);
    const sessionToken = this.cls.get<string>(SESSION_TOKEN);

    if (!ip || !userAgent || !user) {
      // fix
      throw new BadRequestException('Failed');
    }

    console.log('saveAndSendsaveAndSendsaveAndSend');
    console.log(type);
    console.log(ip);
    console.log(userAgent);
    console.log(user);
    console.log(sessionToken);
    console.log('saveAndSendsaveAndSendsaveAndSendsaveAndSendsaveAndSend');

    const otp = this.generate();

    await this.save({
      ip,
      user_agent: userAgent,
      user,
      otp,
      type,
      session_token: sessionToken,
    });

    await this.mailService.sendMail(user.email, otp);
  }

  async verify(otp: string, type: OtpType): Promise<boolean> {
    const ip = this.cls.get(USER_IP_SYMBOL);
    const userAgent = this.cls.get(USER_AGENT_SYMBOL);
    const user = this.cls.get<User>(USER_SYMBOL);
    const sessionToken = this.cls.get<string>(SESSION_TOKEN);

    if (!ip || !userAgent || !user) {
      throw new BadRequestException('Missing required context information.');
    }

    console.log('findfindfindfindfindfindfindfind');
    console.log(type);
    console.log(ip);
    console.log(userAgent);
    console.log(user);
    console.log(sessionToken);
    console.log('findfindfindfindfindfindfindfind');

    const findLatest = await this.findOne({
      where: {
        ip,
        user_agent: userAgent,
        user: { id: user.id },
        type,
        session_token: sessionToken,
      },
    });

    console.log(findLatest);

    if (!findLatest) {
      throw new NotFoundException('OTP not found or has expired.');
    }

    if (findLatest.isExpired()) {
      throw new NotFoundException('OTP has expired.');
    }

    if (findLatest.is_used) {
      throw new BadRequestException('OTP has already been used.');
    }

    findLatest.used();
    await this.save(findLatest);

    return true;
  }
}
