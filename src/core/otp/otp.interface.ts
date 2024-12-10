import { OtpType } from './enums/otp-type.enum';

export const IOtp = 'IOtp';
export interface IOtp {
  generate(): string;
  saveAndSend(type: OtpType): Promise<void>;
  verify(otp: string, type: OtpType): Promise<boolean>;
}
