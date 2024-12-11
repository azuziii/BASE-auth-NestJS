import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { ISession } from './session.interface';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SessionInterceptor } from './interceptor/session.interceptor';
import { SessionGuard } from './guards/session.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [
    SessionService,
    {
      provide: ISession,
      useExisting: SessionService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SessionInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: SessionGuard,
    },
  ],
  exports: [ISession],
})
export class SessionModule {}
