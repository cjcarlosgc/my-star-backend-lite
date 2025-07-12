import { Module } from '@nestjs/common';
import { InvoiceDetailResolver } from './invoice-detail.resolver';
import { InvoiceDetailService } from './invoice-detail.service';

@Module({
  providers: [InvoiceDetailResolver, InvoiceDetailService]
})
export class InvoiceDetailModule {}
