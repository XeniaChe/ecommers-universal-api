import { NestFactory } from '@nestjs/core';
import { UniversalApiModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(UniversalApiModule);
  await app.listen(3000);
}
bootstrap();
