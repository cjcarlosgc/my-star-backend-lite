import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '@app/shared/dto/base-output.dto';
import { Customer } from '../entities/customer.entity';

@ObjectType()
export class CreateCustomerOutput {
  @Field(() => String, { nullable: true })
  customerId: string;
}
