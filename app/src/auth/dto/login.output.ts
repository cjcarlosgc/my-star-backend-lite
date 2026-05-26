import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../auth.service';

@ObjectType()
export class MenuItemType {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  redirectTo: string;
}

@ObjectType()
export class LoginOutput {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  userId?: number;

  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  role?: Role;

  @Field(() => [MenuItemType])
  menuItems: MenuItemType[];
}
