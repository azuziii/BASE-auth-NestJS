import { Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAuth } from '../auth.interface';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(IAuth) private readonly authService: IAuth) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log(222);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
