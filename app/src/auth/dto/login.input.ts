import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  userName: string;

  @Field()
  password: string;
}