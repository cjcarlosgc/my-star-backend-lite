import { Injectable } from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { CreateCustomerOutput } from './dto/create-customer.output';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { UpdateCustomerOutput } from './dto/update-customer.output';
import { DeleteCustomerInput } from './dto/delete-customer.input';
import { DeleteCustomerOutput } from './dto/delete-customer.output';

type RemoteCustomer = {
  id: number;
  dni: string;
  name: string;
  lastname: string;
  sex: string;
  age?: number;
};

type CustomersResponse = {
  data?: RemoteCustomer[];
  success?: boolean;
};

type CustomerResponse = {
  data?: RemoteCustomer;
  success?: boolean;
};

@Injectable()
export class CustomerService {
  private readonly baseUrl =
    process.env.CUSTOMER_API_BASE_URL ?? 'https://my-star-services.onrender.com';

  private customers: Customer[] = [];

  public async create(
    token: string,
    input: CreateCustomerInput,
  ): Promise<CreateCustomerOutput> {
    void token;

    const lastItemId = this.customers[this.customers.length - 1]?.id ?? '0';
    const newIdNumeration = Number(lastItemId) + 1;
    const newIdFirstPart = String(newIdNumeration);

    const customer: Customer = {
      id: newIdFirstPart,
      name: input.name,
      lastName: input.lastName,
      dni: input.dni,
      sex: input.sex,
    };
    this.customers.push(customer);
    return Promise.resolve({
      customerId: customer.id,
    });
  }

  public async update(
    token: string,
    id: string,
    input: UpdateCustomerInput,
  ): Promise<UpdateCustomerOutput> {
    void token;

    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) throw new Error();

    const updated: Customer = {
      id: this.customers[index].id,
      name: input.name ?? this.customers[index].name,
      lastName: input.lastName ?? this.customers[index].lastName,
      dni: input.dni ?? this.customers[index].dni,
      sex: input.sex ?? this.customers[index].sex,
      age: this.customers[index].age,
    };
    this.customers[index] = updated;
    return Promise.resolve({ customerId: updated.id });
  }

  public async delete(
    token: string,
    input: DeleteCustomerInput,
  ): Promise<DeleteCustomerOutput> {
    void token;

    const index = this.customers.findIndex((c) => c.id === input.id);
    if (index === -1) throw new Error();

    this.customers.splice(index, 1);
    return Promise.resolve({
      customerId: input.id,
    });
  }

  public async findAll(token: string): Promise<Customer[]> {
    const response = await fetch(`${this.baseUrl}/api/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de customers');
    }

    const body = (await response.json()) as CustomersResponse;
    if (!body.success || !Array.isArray(body.data)) {
      throw new Error('Respuesta inválida del servicio de customers');
    }

    this.customers = body.data.map((customer) =>
      this.mapRemoteCustomer(customer),
    );

    return this.customers;
  }

  public async findById(token: string, id: string): Promise<Customer | null> {
    const response = await fetch(`${this.baseUrl}/api/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const body = (await response.json()) as CustomerResponse;

      if (body.success && body.data) {
        const customer = this.mapRemoteCustomer(body.data);
        this.upsertLocalCustomer(customer);
        return customer;
      }
    }

    return Promise.resolve(this.customers.find((c) => c.id === id) ?? null);
  }

  public async findBy(
    token: string,
    searchType: 'BY_NAME' | 'BY_SEX' | 'BY_DNI',
    pattern: string,
  ): Promise<Customer[]> {
    if (this.customers.length === 0) {
      await this.findAll(token);
    }

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

    return Promise.resolve(result);
  }

  private mapRemoteCustomer(customer: RemoteCustomer): Customer {
    return {
      id: String(customer.id),
      name: customer.name,
      lastName: customer.lastname,
      dni: customer.dni,
      sex: customer.sex,
      age: customer.age,
    };
  }

  private upsertLocalCustomer(customer: Customer): void {
    const index = this.customers.findIndex((c) => c.id === customer.id);

    if (index === -1) {
      this.customers.push(customer);
      return;
    }

    this.customers[index] = customer;
  }
}
