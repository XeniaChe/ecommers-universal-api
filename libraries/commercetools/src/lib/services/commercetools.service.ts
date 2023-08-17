import { Injectable } from '@nestjs/common';
import { CommercetoolsClientService } from './commercetools-client.service';

@Injectable()
export class CommercetoolsService {
  constructor(private client: CommercetoolsClientService) {}

  async getCustomers() {
    try {
      const customers = (await this.client.customers().get().execute()).body
        .results;
      return customers;
    } catch (error) {
      console.error(error);

      return undefined;
    }
  }
}
