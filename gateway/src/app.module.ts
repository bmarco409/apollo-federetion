import {
  GraphQLDataSource,
  IntrospectAndCompose,
  ServiceEndpointDefinition,
} from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule, JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: (jwtService: JwtService) => {
        return {
          server: {
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
                { name: 'employees', url: 'http://localhost:3000/graphql' },
                { name: 'projects', url: 'http://localhost:3001/graphql' },
              ],
            }),
          },
        };
      },
    }),
  ],
})
export class AppModule {}
