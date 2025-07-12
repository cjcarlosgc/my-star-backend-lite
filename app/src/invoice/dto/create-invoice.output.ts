import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '@app/shared/dto/base-output.dto';
import { Invoice } from '../entities/invoice.entity';

@ObjectType()
export class CreateInvoiceOutput extends BaseOutput {
  @Field(() => Invoice, { nullable: true })
  invoice?: Invoice;
}
