import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceDetailInput {
  @Field()
  productId: string;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Float)
  quantity: number;
}
