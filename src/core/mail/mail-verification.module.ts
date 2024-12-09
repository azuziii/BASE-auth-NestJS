import { Module } from '@nestjs/common';
import { MailVerificationService } from './mail-verification.service';
import { IMailVerification } from './mail-verification.interface';

@Module({
  providers: [
    MailVerificationService,
    {
      provide: IMailVerification,
      useExisting: MailVerificationService,
    },
  ],
  exports: [IMailVerification],
})
export class MailVerificationModule {}
