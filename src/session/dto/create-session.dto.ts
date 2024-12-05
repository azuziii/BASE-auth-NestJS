import {
  IsDate,
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  session_token!: string;

  @IsOptional()
  @IsDate()
  expires_at!: Date;

  @IsNotEmpty()
  @IsIP()
  ip!: string;

  @IsNotEmpty()
  @IsString()
  user_agent!: string;

  @IsNotEmpty()
  user!: User;
}
