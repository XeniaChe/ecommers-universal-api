import { Injectable } from '@nestjs/common';

@Injectable()
export class TestLibService {
  async getCustomers() {
    try {
      const customers = ['test-cust1', 'test-cust2'];
      return customers;
    } catch (error) {
      console.error(error);

      return undefined;
    }
  }
}
