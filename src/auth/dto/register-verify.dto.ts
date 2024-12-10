import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyRegister {
  @IsNotEmpty()
  @IsString()
  otp!: string;
}
