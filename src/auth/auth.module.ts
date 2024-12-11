import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { SessionModule } from 'src/session/session.module';
import { SessionStrategy } from './strategy/session.strategy';
import { PassportModule } from '@nestjs/passport';
import { IAuth } from './auth.interface';
import { OtpModule } from 'src/core/otp/otp.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [UserModule, SessionModule, PassportModule, OtpModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    SessionStrategy,
    {
      provide: IAuth,
      useExisting: AuthService,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [IAuth],
})
export class AuthModule {}
