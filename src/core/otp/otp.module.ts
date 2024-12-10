import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { IOtp } from './otp.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { MailVerificationModule } from '../mail/mail-verification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Otp]), MailVerificationModule],
  providers: [
    OtpService,
    {
      provide: IOtp,
      useExisting: OtpService,
    },
  ],
  exports: [IOtp],
})
export class OtpModule {}
