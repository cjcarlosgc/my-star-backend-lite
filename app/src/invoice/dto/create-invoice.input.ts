import { CreateInvoiceDetailInput } from '@app/invoice-detail/dto/create-invoice-detail.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceInput {
  @Field()
  customerId: string;

  @Field(() => [CreateInvoiceDetailInput])
  items: CreateInvoiceDetailInput[];
}
