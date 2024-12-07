import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { SessionInterceptor } from './session/interceptor/session.interceptor';
import { SessionStrategy } from './auth/strategy/session.strategy';
import { RoleStrategy } from './auth/strategy/role.strategy';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //  add secrete  app.useGlobalPipes(
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.use(CookieParser());
  app.useGlobalInterceptors(new SessionInterceptor());

  const sessionGuard = app.get(SessionStrategy);
  app.useGlobalGuards(sessionGuard);

  const roleGuard = app.get(RoleStrategy);
  app.useGlobalGuards(roleGuard);

  app.enableCors({
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['content-type'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
