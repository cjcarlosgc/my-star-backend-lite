import { Injectable } from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { CreateCustomerOutput } from './dto/create-customer.output';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { UpdateCustomerOutput } from './dto/update-customer.output';
import { DeleteCustomerInput } from './dto/delete-customer.input';
import { DeleteCustomerOutput } from './dto/delete-customer.output';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [
    { id: 'c1', name: 'Carlos', lastName: 'Pérez', dni: '12345678', sex: 'M' },
    { id: 'c2', name: 'Lucía', lastName: 'Ramírez', dni: '87654321', sex: 'F' },
    { id: 'c3', name: 'Miguel', lastName: 'Gómez', dni: '11223344', sex: 'M' },
    { id: 'c4', name: 'María', lastName: 'López', dni: '22334455', sex: 'F' },
    { id: 'c5', name: 'Juan', lastName: 'Martínez', dni: '33445566', sex: 'M' },
    { id: 'c6', name: 'Maria Fernanda', lastName: 'Sánchez', dni: '44556677', sex: 'F' },
    { id: 'c7', name: 'Pedro', lastName: 'Fernández', dni: '55667788', sex: 'M' },
    { id: 'c8', name: 'Sofía', lastName: 'García', dni: '66778899', sex: 'F' },
    { id: 'c9', name: 'Miguel', lastName: 'Torres', dni: '77889900', sex: 'M' },
    { id: 'c10', name: 'Miguel Angel', lastName: 'Morales', dni: '88990011', sex: 'F' },
    { id: 'c11', name: 'Juan Pedro', lastName: 'Castro', dni: '99001122', sex: 'M' },
    { id: 'c12', name: 'Carla', lastName: 'Silva', dni: '10111213', sex: 'F' },
    { id: 'c13', name: 'Andrés', lastName: 'Reyes', dni: '12131415', sex: 'M' },
    { id: 'c14', name: 'Juan Carlos', lastName: 'Herrera', dni: '66141516', sex: 'F' },
    { id: 'c15', name: 'Carlo', lastName: 'Mendoza', dni: '66151617', sex: 'M' },
  ];

  public async create(
    input: CreateCustomerInput,
  ): Promise<CreateCustomerOutput> {
     const lastItemId = this.customers[this.customers.length-1].id;
    const lastItemIdNumber = lastItemId.split('c')[1];
    const newIdNumeration = Number(lastItemIdNumber) + 1;
    const newIdFirstPart = 'c' + newIdNumeration;

    const customer: Customer = {
      id: newIdFirstPart,
      ...input,
    };
    this.customers.push(customer);
    return await Promise.resolve({
      customerId: customer.id
    });
  }

  public async update(
    id: string,
    input: UpdateCustomerInput,
  ): Promise<UpdateCustomerOutput> {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1)
      throw new Error();

    const updated = { ...this.customers[index], ...input };
    this.customers[index] = updated;
    return await Promise.resolve({ customerId: updated.id });
  }

  public async delete(
    input: DeleteCustomerInput,
  ): Promise<DeleteCustomerOutput> {
    const index = this.customers.findIndex((c) => c.id === input.id);
    if (index === -1)
      throw new Error();

    this.customers.splice(index, 1);
    return await Promise.resolve({
      customerId: input.id
    });
  }

  public async findAll(): Promise<Customer[]> {
    return await Promise.resolve(this.customers);
  }

  public async findById(id: string): Promise<Customer | null> {
    return await Promise.resolve(
      this.customers.find((c) => c.id === id) ?? null,
    );
  }

  public async findBy(
    searchType: 'BY_NAME' | 'BY_SEX' | 'BY_DNI',
    pattern: string,
  ): Promise<Customer[]> {
    const lowerPattern = pattern.toLowerCase();
    let result: Customer[] = [];

    if (searchType === 'BY_NAME') {
      result = this.customers.filter((c) =>
        c.name.toLowerCase().startsWith(lowerPattern),
      );
    } else if (searchType === 'BY_SEX') {
      result = this.customers.filter((c) =>
        c.sex.toLowerCase().startsWith(lowerPattern),
      );
    } else if (searchType === 'BY_DNI') {
      result = this.customers.filter((c) =>
        c.dni.toLowerCase().startsWith(lowerPattern),
      );
    }
    return await Promise.resolve(result);
  }
}
