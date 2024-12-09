import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateOtpDto {
  @IsNotEmpty()
  otp!: string;

  @IsNotEmpty()
  ip!: string;

  @IsNotEmpty()
  user_agent!: string;

  @IsNotEmpty()
  user!: User;
}
