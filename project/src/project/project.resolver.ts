import { Inject } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import {
  CreateProjectDTO,
  PaginatedCursorProjectDTO,
  PaginatedOffsetProjectDTO,
  ProjectDTO,
  UpdateProjectDTO,
} from 'src/shared/dto/gql/project';
import { Project as ProjectDomain } from 'src/shared/domain/project';
import { IService } from 'src/shared/interface/service.interface';
import {
  fromProjectDomainToGQL,
  fromProjectGQLCreateToDomain,
  fromProjectsDomainToGQL,
} from 'src/shared/mapper/project.mapper';
import { EmployeeDTO } from 'src/shared/dto/gql/employee';
import {
  PaginationArgsDTO,
  PaginationOffsetArgsDTO,
} from 'src/shared/dto/gql/paginate';
import { fromPaginationOffsetToDomain } from 'src/shared/mapper/pagination.mapper';

@Resolver(() => ProjectDTO)
export class ProjectResolver {
  constructor(
    @Inject('PROJECT_SERVICE')
    private readonly projectService: IService<ProjectDomain>,
  ) {}

  @Query(() => ProjectDTO)
  async project(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<ProjectDTO> {
    const res = await this.projectService.findOne(id);
    return fromProjectDomainToGQL(res);
  }

  @Query(() => [ProjectDTO])
  async projects(): Promise<ProjectDTO[]> {
    const res = await this.projectService.findMany();
    return fromProjectsDomainToGQL(res);
  }

  @Mutation(() => ProjectDTO)
  async createProject(
    @Args('project') project: CreateProjectDTO,
  ): Promise<ProjectDTO> {
    const res = await this.projectService.create(
      fromProjectGQLCreateToDomain(project),
    );

    return fromProjectDomainToGQL(res);
  }

  @Mutation(() => ProjectDTO)
  async updateProject(
    @Args('project') project: UpdateProjectDTO,
  ): Promise<ProjectDTO> {
    const res = await this.projectService.update(
      fromProjectGQLCreateToDomain(project),
    );

    return fromProjectDomainToGQL(res);
  }

  @Query(() => PaginatedCursorProjectDTO)
  async paginatedProject(
    @Args() pagination: PaginationArgsDTO,
    @Args({ name: 'filter', type: () => Int }) filter: number,
  ): Promise<PaginatedCursorProjectDTO> {
    const res = await this.projectService.findMany();
    //const paginated = new PaginatedProjectDTO()
    return {
      edges: null,
      hasNextPage: false,
      nodes: fromProjectsDomainToGQL(res),
      totalCount: res.length,
    };
  }

  @Query(() => PaginatedOffsetProjectDTO)
  async paginatedOffsetProject(
    @Args() pagination: PaginationOffsetArgsDTO,
  ): Promise<PaginatedOffsetProjectDTO> {
    const res = await this.projectService.findMany(
      fromPaginationOffsetToDomain(pagination),
    );
    return {
      nodes: fromProjectsDomainToGQL(res),
      currentpage: pagination.currentpage,
      nextPage: null,
      numberOfItems: pagination.numberOfItems,
      prevPage: null,
      totalCount: res.length,
    };
  }

  // @ResolveField('employees', () => [])
  // async employees(@Parent() project: ProjectDTO): Promise<[]> {
  //   console.log(project);
  //   return { __typename: 'Employees', id: project.employees };
  // }
}
