import { Injectable, Inject } from '@nestjs/common';
import { CommercetoolsService } from 'commercetools';
import { TestLibService } from 'test-lib';

@Injectable()
export class UniversalApiService {
  ecommProvider;

  constructor(
    @Inject('EXTERNAL_SERVICE')
    private service: CommercetoolsService | TestLibService
  ) {
    this.ecommProvider = this.service;
  }

  getCustomers() {
    return this.ecommProvider.getCustomers();
  }
}
