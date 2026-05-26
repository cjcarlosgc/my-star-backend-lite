import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceDetailModule } from './invoice-detail/invoice-detail.module';
import { AuthModule } from './auth/auth.module';
import { getBearerToken } from './shared/auth/graphql-context';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // si querés usar GraphQL Playground
      context: ({ req }) => ({
        req,
        token: getBearerToken(req?.headers?.authorization),
      }),
    }),
    ProductModule,
    CustomerModule,
    InvoiceModule,
    InvoiceDetailModule,
    AuthModule
  ],
})
export class AppModule {}
