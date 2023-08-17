import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommercetoolsService } from './services/commercetools.service';
import { CommercetoolsClientService } from './services/commercetools-client.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [CommercetoolsService, CommercetoolsClientService],
  exports: [CommercetoolsService, CommercetoolsClientService],
})
export class CommercetoolsModule {}
