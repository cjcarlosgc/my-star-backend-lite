import { Field, Float, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  dni: string;

  @Field()
  sex: string;
}
