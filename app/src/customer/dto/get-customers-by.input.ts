import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetCustomersByInput {
  @Field()
  searchType: 'BY_NAME' | 'BY_SEX' | 'BY_DNI';
  @Field()
  pattern: string;
}
