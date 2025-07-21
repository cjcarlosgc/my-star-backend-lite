import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteCustomerOutput {
     @Field(() => String, { nullable: true })
      customerId: string;
}
