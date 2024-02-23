import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectDataloaderService } from './dataloader/project-dataloaders.service';
import { IDataloaders } from './shared/interface/dataloader.interface';
import { Project } from './shared/domain/project';
import { DataloaderModule } from './dataloader/dataloader.module';

@Module({
  imports: [
    ProjectModule,
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      imports: [DataloaderModule],
      useFactory: (dataloaderService: ProjectDataloaderService) => {
        return {
          autoSchemaFile: {
            federation: 2,
          },
          playground: true,
          context: (): { loaders: IDataloaders<Project[]> } => ({
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
      inject: [ProjectDataloaderService],
    }),
    DataloaderModule,
  ],
})
export class AppModule {}
