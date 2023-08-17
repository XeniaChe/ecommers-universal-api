import { Test, TestingModule } from '@nestjs/testing';
import { CommercetoolsClientService } from './commercetools-client.service';

describe('CommercetoolsClientService', () => {
  let service: CommercetoolsClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommercetoolsClientService],
    }).compile();

    service = module.get<CommercetoolsClientService>(CommercetoolsClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
