import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { DeleteProductInput } from './dto/delete-product.input';
import { CreateProductOutput } from './dto/create-product.output';
import { UpdateProductOutput } from './dto/update-product.output';
import { DeleteProductOutput } from './dto/delete-product.output';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly service: ProductService) {}

  @Mutation(() => CreateProductOutput)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.service.create(input);
  }

  @Mutation(() => UpdateProductOutput)
  updateProduct(
    @Args('id') id: string,
    @Args('input') input: UpdateProductInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => DeleteProductOutput)
  deleteProduct(@Args('input') input: DeleteProductInput) {
    return this.service.delete(input);
  }

  @Query(() => [Product])
  products() {
    return this.service.findAll();
  }

  @Query(() => Product, { nullable: true })
  product(@Args('id') id: string) {
    return this.service.findById(id);
  }
}
