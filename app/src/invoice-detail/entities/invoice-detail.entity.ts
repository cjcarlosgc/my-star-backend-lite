import { Field, Float, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class InvoiceDetail {
  @Field(() => ID)
  id: string;

  @Field()
  invoiceId: string;

  @Field()
  productId: string;

  @Field(() => Float)
  unitPrice: number;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  subtotal: number;
}
