import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { EmployeeDTO } from 'src/shared/dto/gql/employee';
import { ProjectDTO } from 'src/shared/dto/gql/project';
import { ProjectService } from './project.service';
import {
  fromProjectDomainToGQL,
  fromProjectsDomainToGQL,
} from 'src/shared/mapper/project.mapper';
import { Inject } from '@nestjs/common';
import { IService } from 'src/shared/interface/service.interface';
import { Project as ProjectDomain } from 'src/shared/domain/project';
import { IDataloaders } from 'src/shared/interface/dataloader.interface';

@Resolver(() => EmployeeDTO)
export class EmployeesResolver {
  constructor(
    @Inject('PROJECT_SERVICE')
    private readonly projectService: IService<ProjectDomain>,
  ) {}

  // @ResolveField(() => [ProjectDTO])
  // async projects(@Parent() employee: EmployeeDTO): Promise<ProjectDTO[]> {
  //   const projects = await this.projectService.findByEmployees([employee.id]);
  //   return fromProjectsDomainToGQL(projects);
  // }

  @ResolveField('projects', () => [ProjectDTO])
  async getProjects(
    @Parent() employee: EmployeeDTO,
    @Context() { loaders }: { loaders: IDataloaders<ProjectDomain[]> },
  ): Promise<ProjectDTO[]> {
    const { id } = employee;
    const projects = await loaders.projectsLoader.load(id);
    return fromProjectsDomainToGQL(projects);
  }
}
