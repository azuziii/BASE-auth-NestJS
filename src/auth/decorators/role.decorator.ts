import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/enum/user_role.enum';

export const ROLE_SYMBOL = 'ROLE';
export const Role = (value: UserRole) => SetMetadata(ROLE_SYMBOL, value);
