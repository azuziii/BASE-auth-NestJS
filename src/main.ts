import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
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

  app.enableCors({
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['content-type'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
