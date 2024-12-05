import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //  add secrete
  app.use(CookieParser());
  await app.listen(3000);
}
bootstrap();
