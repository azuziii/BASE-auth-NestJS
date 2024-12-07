import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { SessionModule } from 'src/session/session.module';
import { SessionStrategy } from './strategy/session.strategy';
import { PassportModule } from '@nestjs/passport';
import { IAuth } from './auth.interface';
import { RoleStrategy } from './strategy/role.strategy';

@Module({
  imports: [UserModule, SessionModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    SessionStrategy,
    RoleStrategy,
    {
      provide: IAuth,
      useExisting: AuthService,
    },
  ],
  exports: [IAuth],
})
export class AuthModule {}
