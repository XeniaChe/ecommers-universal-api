import { Module, DynamicModule } from '@nestjs/common';
// import { AppController } from './app.controller';
import { UniversalApiService } from './app.service';
import {
  CommercetoolsModule /* , CommercetoolsService */,
} from 'commercetools';
import { TestModule /* , TestLibService */ } from 'test-lib';

export interface EcommerceProviderOptions {
  provider: string;
}

//TODO: Dynamic module providers
@Module({})
export class UniversalApiModule {
  static register(opt: string): DynamicModule {
    const imports = opt === 'commTools' ? [CommercetoolsModule] : [TestModule];
    // const providers =
    //   opt === 'commTools' ? [CommercetoolsService] : [TestLibService];

    return {
      module: UniversalApiModule,
      imports,
      providers: [
        // ...providers,
        {
          provide: 'ECOMMERCE_PROVIDER_OPTIONS',
          useValue: opt,
        },
        UniversalApiService,
      ],
      exports: [UniversalApiService],
    };
  }
}
