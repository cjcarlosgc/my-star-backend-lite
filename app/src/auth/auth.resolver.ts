import { Query, Args, Resolver } from '@nestjs/graphql';
import { AuthService, Role, MenuItem } from './auth.service';
import { LoginOutput } from './dto/login.output';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginOutput, { nullable: true })
  login(@Args('input') input: LoginInput): LoginOutput {
    return this.authService.login(input);
  }
}
