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
  userId: number;

  @Field()
  userName: string;

  @Field()
  name: string;

  @Field(() => String)
  role: Role;

  @Field(() => [MenuItemType])
  menuItems: MenuItemType[];
}
