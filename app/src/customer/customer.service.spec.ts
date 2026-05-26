import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let fetchSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    fetchSpy = jest.spyOn(globalThis, 'fetch' as never);
  });

  afterEach(() => {
    fetchSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return customers by DNI pattern', async () => {
    await service.create('token', {
      name: 'Jean',
      lastName: 'Garcia',
      dni: '66778899',
      sex: 'M',
    });

    const result = await service.findBy('token', 'BY_DNI', '66');

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((customer) => {
      expect(customer.dni.startsWith('66')).toBe(true);
    });
  });

  it('should authenticate and map remote customers', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: [
          {
            id: 1,
            dni: '12345678',
            name: 'Carlos',
            lastname: 'García',
            sex: 'M',
            age: 28,
          },
        ],
      }),
    } as Response);

    const result = await service.findAll('abc123');

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://my-star-services.onrender.com/api/customers',
      {
        headers: {
          Authorization: 'Bearer abc123',
        },
      },
    );
    expect(result).toEqual([
      {
        id: '1',
        dni: '12345678',
        name: 'Carlos',
        lastName: 'García',
        sex: 'M',
        age: 28,
      },
    ]);
  });

  it('should fail when customers request is not successful', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false }),
    } as Response);

    await expect(service.findAll('abc123')).rejects.toThrow(
      'No se pudo obtener la lista de customers',
    );
  });

  it('should fail when customers response is invalid', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, data: [] }),
    } as Response);

    await expect(service.findAll('abc123')).rejects.toThrow(
      'Respuesta inválida del servicio de customers',
    );
  });
});
