import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.only('should return customers by DNI pattern', async () => {
    const result = await service.findBy('BY_DNI', '66');

    console.log(result);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((customer) => {
      expect(customer.dni.startsWith('66')).toBe(true);
    });
  });
});
