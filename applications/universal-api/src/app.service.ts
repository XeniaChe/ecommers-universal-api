import { Injectable, Inject } from '@nestjs/common';
import { CommercetoolsService } from 'commercetools';
import { TestLibService } from 'test-lib';

@Injectable()
export class UniversalApiService {
  ecommProvider;
  constructor(
    @Inject('ECOMMERCE_PROVIDER_OPTIONS')
    private opt: /*  Record<string, any> */ string,
    private readonly commToolsService: CommercetoolsService,
    private readonly testService: TestLibService
  ) {
    this.ecommProvider = opt == 'commTools' ? commToolsService : testService;
  }

  getCustomers() {
    return this.ecommProvider.getCustomers();
  }

  /*  getHello(): string {
    return 'Hello World!';
  } */
}
