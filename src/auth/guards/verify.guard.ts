import {
  CanActivate,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IUser } from 'src/user/user.interface';

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(@Inject(IUser) private readonly userService: IUser) {}

  canActivate(): boolean {
    const isVerified = this.userService.isVerified();
    if (isVerified) {
      throw new ForbiddenException('Your account is alrady verified');
    }

    return true;
  }
}
