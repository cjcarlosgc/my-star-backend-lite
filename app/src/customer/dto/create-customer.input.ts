import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  dni: string;

  @Field()
  sex: string;
}
