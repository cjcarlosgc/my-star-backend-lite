import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  dni?: string;

  @Field({ nullable: true })
  sex?: string;
}
