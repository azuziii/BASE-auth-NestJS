import { IsEnum, IsIP, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { OtpType } from '../enums/otp-type.enum';

export class CreateOtpDto {
  @IsNotEmpty()
  @IsString()
  otp!: string;

  @IsNotEmpty()
  @IsIP()
  ip!: string;

  @IsNotEmpty()
  @IsString()
  user_agent!: string;

  @IsNotEmpty()
  @IsString()
  session_token!: string;

  @IsNotEmpty()
  user!: User;

  @IsNotEmpty()
  @IsEnum(OtpType)
  type!: OtpType;
}
