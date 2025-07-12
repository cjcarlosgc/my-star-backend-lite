import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from '@app/shared/dto/base-output.dto';
import { Product } from '../entities/product.entity';

@ObjectType()
export class UpdateProductOutput extends BaseOutput {
  @Field(() => Product, { nullable: true })
  product?: Product;
}
