import { InvoiceDetail } from "@app/invoice-detail/entities/invoice-detail.entity";
import { Field, Float, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Invoice {
  @Field(() => ID)
  id: string;

  @Field()
  customerId: string;

  @Field(() => Float)
  total: number;

  @Field()
  createdAt: Date;

  @Field(() => [InvoiceDetail], { nullable: true })
  items?: InvoiceDetail[];
}
