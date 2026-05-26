import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  dni: string;

  @Field()
  sex: string;

  @Field(() => Int, { nullable: true })
  age?: number;
}
