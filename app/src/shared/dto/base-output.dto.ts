import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseOutput {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}