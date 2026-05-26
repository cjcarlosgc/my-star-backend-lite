import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
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
import {
  GraphqlContext,
  requireBearerToken,
} from '../shared/auth/graphql-context';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly service: CustomerService) {}

  @Mutation(() => CreateCustomerOutput)
  createCustomer(
    @Args('input') input: CreateCustomerInput,
    @Context() context: GraphqlContext,
  ) {
    const token = requireBearerToken(context);
    return this.service.create(token, input);
  }

  @Mutation(() => UpdateCustomerOutput)
  updateCustomer(
    @Args('id') id: string,
    @Args('input') input: UpdateCustomerInput,
    @Context() context: GraphqlContext,
  ) {
    const token = requireBearerToken(context);
    return this.service.update(token, id, input);
  }

  @Mutation(() => DeleteCustomerOutput)
  deleteCustomer(
    @Args('input') input: DeleteCustomerInput,
    @Context() context: GraphqlContext,
  ) {
    const token = requireBearerToken(context);
    return this.service.delete(token, input);
  }

  @Query(() => [Customer])
  customers(@Context() context: GraphqlContext) {
    const token = requireBearerToken(context);
    return this.service.findAll(token);
  }

  @Query(() => Customer, { nullable: true })
  customer(
    @Args('input') input: GetCustomerInput,
    @Context() context: GraphqlContext,
  ) {
    const token = requireBearerToken(context);
    return this.service.findById(token, input.id);
  }

  @Query(() => [Customer])
  findCustomersBy(
    @Args('input') input: GetCustomersByInput,
    @Context() context: GraphqlContext,
  ) {
    const token = requireBearerToken(context);
    return this.service.findBy(token, input.searchType, input.pattern);
  }
}
