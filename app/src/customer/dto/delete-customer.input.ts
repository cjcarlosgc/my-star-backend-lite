import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class DeleteCustomerInput {
  @Field(() => ID)
  id: string;
}
