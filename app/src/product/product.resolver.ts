import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { DeleteProductInput } from './dto/delete-product.input';
import { CreateProductOutput } from './dto/create-product.output';
import { UpdateProductOutput } from './dto/update-product.output';
import { DeleteProductOutput } from './dto/delete-product.output';
import {
  GraphqlContext,
  requireBearerToken,
} from '../shared/auth/graphql-context';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly service: ProductService) {}

  @Mutation(() => CreateProductOutput)
  createProduct(
    @Args('input') input: CreateProductInput,
    @Context() context: GraphqlContext,
  ) {
    requireBearerToken(context);
    return this.service.create(input);
  }

  @Mutation(() => UpdateProductOutput)
  updateProduct(
    @Args('input') input: UpdateProductInput,
    @Context() context: GraphqlContext,
  ) {
    requireBearerToken(context);
    return this.service.update(input.id, input);
  }

  @Mutation(() => DeleteProductOutput)
  deleteProduct(
    @Args('input') input: DeleteProductInput,
    @Context() context: GraphqlContext,
  ) {
    requireBearerToken(context);
    return this.service.delete(input);
  }

  @Query(() => [Product])
  products(@Context() context: GraphqlContext) {
    requireBearerToken(context);
    return this.service.findAll();
  }

  @Query(() => Product, { nullable: true })
  product(@Args('id') id: string, @Context() context: GraphqlContext) {
    requireBearerToken(context);
    return this.service.findById(id);
  }
}
