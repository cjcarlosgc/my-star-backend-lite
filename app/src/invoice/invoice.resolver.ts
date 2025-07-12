import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { Invoice } from './entities/invoice.entity';
import { InvoiceDetail } from '@app/invoice-detail/entities/invoice-detail.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { CreateInvoiceOutput } from './dto/create-invoice.output';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private readonly service: InvoiceService) {}

  @Mutation(() => CreateInvoiceOutput)
  createInvoice(@Args('input') input: CreateInvoiceInput) {
    return this.service.create(input);
  }

  @Query(() => [Invoice])
  invoices() {
    return this.service.findAll();
  }

  @ResolveField(() => [InvoiceDetail])
  items(@Parent() invoice: Invoice) {
    return this.service.findDetailsByInvoiceId(invoice.id);
  }
}
