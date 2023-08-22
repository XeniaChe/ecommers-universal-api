import { Module, DynamicModule /* , Provider */ } from '@nestjs/common';
import { UniversalApiService } from './app.service';
import { CommercetoolsModule, CommercetoolsClientService } from 'commercetools';
import { TestModule, TestLibService } from 'test-lib';

/* import { Type } from '@nestjs/common/interfaces';
interface ConnectSrv {
  generateConfigs(): EcommerceProviderConfigs;
}

interface ConfigOptType {
  useValue: Type<ConnectSrv>;
}
 */
interface EcommerceProviderConfigs {
  CTP_PROJECT_KEY: string;
  CTP_CLIENT_SECRET: string;
  CTP_CLIENT_ID: string;
  CTP_AUTH_URL: string;
  CTP_API_URL: string;
  CTP_SCOPES: string;
  CTP_REGION: string;
}

@Module({})
export class UniversalApiModule {
  // Dynamic module
  /* https://docs.nestjs.com/fundamentals/dynamic-modules */
  static register(
    opt: string,
    configs: EcommerceProviderConfigs
  ): DynamicModule {
    const imports =
      opt === 'commTools'
        ? [CommercetoolsModule.register(configs)]
        : [TestModule];

    return {
      module: UniversalApiModule,
      imports,
      providers: [
        // Custom useFactory provider
        /* https://docs.nestjs.com/fundamentals/custom-providers#class-providers-useclass */
        {
          provide: 'EXTERNAL_SERVICE',
          useFactory: () =>
            opt === 'commTools'
              ? new CommercetoolsClientService(configs)
              : TestLibService,
        },
        UniversalApiService,
        // TODO: bring back after the issue with ConfigService in consumer app fixed
        // ...this.eCommerceProvider(opt, configOptions),
      ],
      exports: [UniversalApiService],
    };
  }

  /*  static eCommerceProvider(opt: string, configs: ConfigOptType): Provider[] {
    return [
      {
        provide: 'EXTERNAL_SERVICE',
        useFactory: (configOptions: ConnectSrv) =>
          opt === 'commTools'
            ? new CommercetoolsClientService(configOptions.generateConfigs())
            : new TestLibService(),
        inject: [configs.useClass],
      },
      { provide: configs.useClass, useClass: configs.useClass },
    ];
  } */
}
