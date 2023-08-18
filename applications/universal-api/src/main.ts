import { NestFactory } from '@nestjs/core';
import { UniversalApiModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(UniversalApiModule);
  // mainModule = app.get(UniversalApiModule);
  await app.close();
}
bootstrap();
