import { Injectable } from '@nestjs/common';
import { Invoice } from './entities/invoice.entity';
import { InvoiceDetail } from '@app/invoice-detail/entities/invoice-detail.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { CreateInvoiceOutput } from './dto/create-invoice.output';

@Injectable()
export class InvoiceService {
  private invoices: Invoice[] = [
    {
      id: 'f1',
      customerId: 'c1',
      createdAt: new Date('2024-01-01'),
      total: 2600,
      items: [],
    },
    {
      id: 'f2',
      customerId: 'c2',
      createdAt: new Date('2024-01-05'),
      total: 680,
      items: [],
    },
  ];

  private details: InvoiceDetail[] = [
    {
      id: 'd1',
      invoiceId: 'f1',
      productId: 'p1',
      unitPrice: 2500,
      quantity: 1,
      subtotal: 2500,
    },
    {
      id: 'd2',
      invoiceId: 'f1',
      productId: 'p2',
      unitPrice: 100,
      quantity: 1,
      subtotal: 100,
    },
    {
      id: 'd3',
      invoiceId: 'f2',
      productId: 'p3',
      unitPrice: 600,
      quantity: 1,
      subtotal: 600,
    },
    {
      id: 'd4',
      invoiceId: 'f2',
      productId: 'p5',
      unitPrice: 80,
      quantity: 1,
      subtotal: 80,
    },
  ];

  public async create(input: CreateInvoiceInput): Promise<CreateInvoiceOutput> {
    const invoiceId = crypto.randomUUID();
    const createdAt = new Date();
    const items = input.items.map((item) => ({
      id: crypto.randomUUID(),
      invoiceId,
      ...item,
      subtotal: item.unitPrice * item.quantity,
    }));
    const total = items.reduce((sum, i) => sum + i.subtotal, 0);

    const invoice: Invoice = {
      id: invoiceId,
      customerId: input.customerId,
      createdAt,
      total,
      items,
    };
    this.invoices.push(invoice);
    this.details.push(...items);
    return Promise.resolve({ success: true, invoice });
  }

  public async findAll(): Promise<Invoice[]> {
    return Promise.resolve(this.invoices);
  }

  async findDetailsByInvoiceId(invoiceId: string): Promise<InvoiceDetail[]> {
    return Promise.resolve(
      this.details.filter((d) => d.invoiceId === invoiceId),
    );
  }
}
