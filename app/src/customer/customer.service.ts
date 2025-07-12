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
  ];

  public async create(
    input: CreateCustomerInput,
  ): Promise<CreateCustomerOutput> {
    const customer: Customer = {
      id: crypto.randomUUID(),
      ...input,
    };
    this.customers.push(customer);
    return await Promise.resolve({
      success: true,
      message: 'Cliente creado',
      customer,
    });
  }

  public async update(
    id: string,
    input: UpdateCustomerInput,
  ): Promise<UpdateCustomerOutput> {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1)
      return await Promise.resolve({
        success: false,
        message: 'Cliente no encontrado',
      });

    const updated = { ...this.customers[index], ...input };
    this.customers[index] = updated;
    return await Promise.resolve({ success: true, customer: updated });
  }

  public async delete(
    input: DeleteCustomerInput,
  ): Promise<DeleteCustomerOutput> {
    const index = this.customers.findIndex((c) => c.id === input.id);
    if (index === -1)
      return await Promise.resolve({
        success: false,
        message: 'Cliente no encontrado',
      });

    this.customers.splice(index, 1);
    return await Promise.resolve({
      success: true,
      message: 'Cliente eliminado',
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
}
