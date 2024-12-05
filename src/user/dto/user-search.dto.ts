import { IsNotEmpty, IsString } from 'class-validator';

export class SearchUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
