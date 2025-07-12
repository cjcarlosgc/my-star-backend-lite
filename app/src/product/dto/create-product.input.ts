import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  description: string;

  @Field()
  brand: string;

  @Field(() => Float)
  unitPrice: number;
}
