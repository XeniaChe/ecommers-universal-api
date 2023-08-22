import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommercetoolsClientService } from './services/commercetools-client.service';

interface EcommerceProviderConfigs {
  CTP_PROJECT_KEY: string;
  CTP_CLIENT_SECRET: string;
  CTP_CLIENT_ID: string;
  CTP_AUTH_URL: string;
  CTP_API_URL: string;
  CTP_SCOPES: string;
  CTP_REGION: string;
}

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [CommercetoolsClientService],
  exports: [CommercetoolsClientService],
})
export class CommercetoolsModule {
  static register(configs: EcommerceProviderConfigs): DynamicModule {
    return {
      module: CommercetoolsModule,
      providers: [{ provide: 'COMMERCETOOLS_CONFIGS', useValue: configs }],
    };
  }
}
