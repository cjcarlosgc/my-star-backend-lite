import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateProductOutput {
  @Field(() => String, { nullable: true })
  productId: string;
}
