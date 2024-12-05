import { IsNotEmpty, IsUUID } from 'class-validator';

export class UuidDto {
  @IsNotEmpty()
  @IsUUID('all')
  id!: string;
}
