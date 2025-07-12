import { Module } from '@nestjs/common';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';

@Module({
  providers: [InvoiceResolver, InvoiceService]
})
export class InvoiceModule {}
