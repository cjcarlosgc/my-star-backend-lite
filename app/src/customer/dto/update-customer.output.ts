import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateCustomerOutput {
  @Field(() => String, { nullable: true })
  customerId: string;
}
