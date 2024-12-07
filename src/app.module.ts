import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';
import {
  USER_AGENT_SYMBOL,
  USER_IP_SYMBOL,
  USER_SYMBOL,
} from './user/constants';
import { Request } from 'express';
import { AuthModule } from './auth/auth.module';
import { UserMiddleware } from './user/middleware/user.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-restless-tree-a23iob12.eu-central-1.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'ydRmCvarH60X',
      database: 'neondb',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
      logging: true,
      ssl: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: false,
        setup: (cls, req: Request) => {
          cls.set(USER_SYMBOL, req.ip);
          cls.set(USER_AGENT_SYMBOL, req.headers['user-agent']);
          cls.set(USER_IP_SYMBOL, req['user']);
        },
      },
    }),
    UserModule,
    SessionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes('*');
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
