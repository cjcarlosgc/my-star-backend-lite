import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetCustomerInput {
  @Field()
  id: string;
}
