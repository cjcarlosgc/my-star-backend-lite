import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { CreateCustomerOutput } from './dto/create-customer.output';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { UpdateCustomerOutput } from './dto/update-customer.output';
import { DeleteCustomerInput } from './dto/delete-customer.input';
import { DeleteCustomerOutput } from './dto/delete-customer.output';
import { GetCustomerInput } from './dto/get-customer.input';
import { GetCustomersByInput } from './dto/get-customers-by.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly service: CustomerService) {}

  @Mutation(() => CreateCustomerOutput)
  createCustomer(@Args('input') input: CreateCustomerInput) {
    return this.service.create(input);
  }

  @Mutation(() => UpdateCustomerOutput)
  updateCustomer(
    @Args('id') id: string,
    @Args('input') input: UpdateCustomerInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => DeleteCustomerOutput)
  deleteCustomer(@Args('input') input: DeleteCustomerInput) {
    return this.service.delete(input);
  }

  @Query(() => [Customer])
  customers() {
    return this.service.findAll();
  }

  @Query(() => Customer, { nullable: true })
  customer(@Args('input') input: GetCustomerInput) {
    return this.service.findById(input.id);
  }

  @Query(() => [Customer])
  findCustomersBy(
    @Args('input') input: GetCustomersByInput
  ) {
    return this.service.findBy(input.searchType, input.pattern);
  }
}
