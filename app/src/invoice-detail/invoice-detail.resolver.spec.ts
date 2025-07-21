import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceDetailResolver } from './invoice-detail.resolver';
import { InvoiceDetailService } from './invoice-detail.service';

describe('InvoiceDetailResolver', () => {
  let resolver: InvoiceDetailResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceDetailResolver, InvoiceDetailService],
    }).compile();

    resolver = module.get<InvoiceDetailResolver>(InvoiceDetailResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
