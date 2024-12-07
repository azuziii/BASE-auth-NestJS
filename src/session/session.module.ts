import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { ISession } from './session.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [
    SessionService,
    {
      provide: ISession,
      useExisting: SessionService,
    },
  ],
  exports: [ISession],
})
export class SessionModule {}
