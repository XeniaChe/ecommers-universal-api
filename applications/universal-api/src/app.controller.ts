import { Controller, Get } from '@nestjs/common';
import { UniversalApiService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: UniversalApiService) {}

  @Get()
  getHello() {
    return this.appService.getCustomers();
  }
}
