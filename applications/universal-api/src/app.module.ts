import { Module, DynamicModule } from '@nestjs/common';
// import { AppController } from './app.controller';
import { UniversalApiService } from './app.service';
import { CommercetoolsModule, CommercetoolsService } from 'commercetools';
import { TestModule, TestLibService } from 'test-lib';

@Module({})
export class UniversalApiModule {
  // Dynamic module
  /* https://docs.nestjs.com/fundamentals/dynamic-modules */
  static register(opt: string): DynamicModule {
    const imports = opt === 'commTools' ? [CommercetoolsModule] : [TestModule];
    // TODO: testing with NO providers
    // const providers =
    //   opt === 'commTools' ? [CommercetoolsService] : [TestLibService];

    // const imports = [CommercetoolsModule, TestModule];
    // const service = opt === 'commTools' ? CommercetoolsService : TestLibService;

    return {
      module: UniversalApiModule,
      imports,
      providers: [
        // Custom classBased provider
        /* https://docs.nestjs.com/fundamentals/custom-providers#class-providers-useclass */
        {
          provide: 'EXTERNAL_SERVICE',
          useClass: opt === 'commTools' ? CommercetoolsService : TestLibService,
        },
        UniversalApiService,
      ],
      exports: [UniversalApiService],
    };
  }
}
