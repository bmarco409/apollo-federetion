import { Module } from '@nestjs/common';
import { PrismaProvider } from 'src/database/prisma.provider';
import { ProjectRepository } from 'src/project/project.repository';
import { ProjectDataloaderService } from './project-dataloaders.service';
import { ProjectDao } from 'src/database/project.dao';

@Module({
  providers: [
    {
      provide: 'PROJECT_REPOSITORY',
      useClass: ProjectRepository,
    },
    PrismaProvider,
    ProjectDataloaderService,
    ProjectDao,
  ],
  exports: [
    {
      provide: 'PROJECT_REPOSITORY',
      useClass: ProjectRepository,
    },
    PrismaProvider,
    ProjectDataloaderService,
    ProjectDao,
  ],
})
export class DataloaderModule {}
