import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class DeleteProductInput {
  @Field(() => ID)
  id: string;
}
