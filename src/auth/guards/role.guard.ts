import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IUser } from 'src/user/user.interface';
import { ROLE_SYMBOL } from '../decorators/role.decorator';
import { User } from 'src/user/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(@Inject(IUser) private readonly userService: IUser) {}

  canActivate(context: ExecutionContext): boolean {
    const isRoleRequired: number = Reflect.getMetadata(
      ROLE_SYMBOL,
      context.getHandler(),
    );

    if (!isRoleRequired) return true;

    const request: Request = context.switchToHttp().getRequest();

    const user = request.user as User;

    return isRoleRequired <= user.role;
  }
}
