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
            context: ({ req, _res }) => {
              if (req.headers?.authorization) {
                // Validate jwt
                return { user: { id: '123' } };
              }
              throw new UnauthorizedException();
            },
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
                { name: 'employees', url: 'http://localhost:3000/graphql' },
                { name: 'projects', url: 'http://localhost:3001/graphql' },
              ],
            }),
            buildService: (definition: ServiceEndpointDefinition) => {
              console.log(definition);
              return {} as GraphQLDataSource;
            },
          },
        };
      },
    }),
  ],
})
export class AppModule {}
