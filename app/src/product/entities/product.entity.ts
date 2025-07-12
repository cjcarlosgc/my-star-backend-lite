import { Field, Float, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  description: string;

  @Field()
  brand: string;

  @Field(() => Float)
  unitPrice: number;
}
