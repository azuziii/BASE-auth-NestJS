import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { ROLE_SYMBOL } from '../decorators/role.decorator';

export class RoleStrategy implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isRoleRequired: number = Reflect.getMetadata(
      ROLE_SYMBOL,
      context.getHandler(),
    );

    if (!isRoleRequired) return true;

    const request: Request = context.switchToHttp().getRequest();

    const user = request.user as User;

    console.log(user);

    return isRoleRequired <= user.role;
  }
}
