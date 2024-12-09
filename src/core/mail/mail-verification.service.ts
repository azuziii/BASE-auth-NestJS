import { Injectable } from '@nestjs/common';
import { IMailVerification } from './mail-verification.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailVerificationService implements IMailVerification {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(email: string, content: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verification code',
      text: content,
    });
  }
}
