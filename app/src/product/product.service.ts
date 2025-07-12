import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { DeleteProductInput } from './dto/delete-product.input';
import { CreateProductOutput } from './dto/create-product.output';
import { UpdateProductOutput } from './dto/update-product.output';
import { DeleteProductOutput } from './dto/delete-product.output';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 'p1',
      description: 'Laptop Lenovo',
      brand: 'Lenovo',
      unitPrice: 2500,
    },
    {
      id: 'p2',
      description: 'Mouse Logitech',
      brand: 'Logitech',
      unitPrice: 100,
    },
    {
      id: 'p3',
      description: 'Monitor Samsung 24"',
      brand: 'Samsung',
      unitPrice: 600,
    },
    {
      id: 'p4',
      description: 'Teclado mecánico',
      brand: 'Redragon',
      unitPrice: 200,
    },
    { id: 'p5', description: 'USB 64GB', brand: 'Kingston', unitPrice: 80 },
  ];

  public async create(input: CreateProductInput): Promise<CreateProductOutput> {
    const product: Product = {
      id: crypto.randomUUID(),
      ...input,
    };
    this.products.push(product);
    return await Promise.resolve({
      success: true,
      message: 'Producto creado',
      product,
    });
  }

  public async update(
    id: string,
    input: UpdateProductInput,
  ): Promise<UpdateProductOutput> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1)
      return await Promise.resolve({
        success: false,
        message: 'Producto no encontrado',
      });

    const updated = { ...this.products[index], ...input };
    this.products[index] = updated;
    return await Promise.resolve({ success: true, product: updated });
  }

  public async delete(input: DeleteProductInput): Promise<DeleteProductOutput> {
    const index = this.products.findIndex((p) => p.id === input.id);
    if (index === -1)
      return await Promise.resolve({
        success: false,
        message: 'Producto no encontrado',
      });

    this.products.splice(index, 1);
    return await Promise.resolve({
      success: true,
      message: 'Producto eliminado',
    });
  }

  public async findAll(): Promise<Product[]> {
    return await Promise.resolve(this.products);
  }

  public async findById(id: string): Promise<Product | null> {
    return await Promise.resolve(
      this.products.find((p) => p.id === id) ?? null,
    );
  }
}
