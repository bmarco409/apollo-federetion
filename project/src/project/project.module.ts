import { Module } from '@nestjs/common';
import { PrismaProvider } from 'src/database/prisma.provider';
import { ProjectDao } from 'src/database/project.dao';
import { ProjectRepository } from './project.repository';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { EmployeesResolver } from './employee.resolver';
import { ProjectDataloaderService } from '../dataloader/project-dataloaders.service';

@Module({
  providers: [
    ProjectDao,
    ProjectResolver,
    EmployeesResolver,
    {
      provide: 'PROJECT_REPOSITORY',
      useClass: ProjectRepository,
    },
    {
      provide: 'PROJECT_SERVICE',
      useClass: ProjectService,
    },
    PrismaProvider,
  ],
})
export class ProjectModule {}
