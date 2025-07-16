import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  brand?: string;

  @Field(() => Float, { nullable: true })
  unitPrice?: number;
}
