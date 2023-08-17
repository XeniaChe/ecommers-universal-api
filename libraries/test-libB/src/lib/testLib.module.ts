import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestLibService } from './services/testLib.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [TestLibService],
  exports: [TestLibService],
})
export class TestModule {}
