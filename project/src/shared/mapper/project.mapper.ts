import { ProjectWithRel } from 'src/database/project';
import { Project as ProjectDomain } from '../domain/project';
import { CreateProjectDTO, ProjectDTO as ProjectGQL } from '../dto/gql/project';
import { Project } from '@prisma/client';

export const fromProjectDaoToDomain = (arg: Project): ProjectDomain => ({
  id: arg.id,
  name: arg.name,
});

export const fromProjectsDaoToDomain = (args: Project[]): ProjectDomain[] =>
  args.map(fromProjectDaoToDomain);

export const fromProjectDomainToDao = (arg: ProjectDomain): Project => ({
  name: arg.name,
  id: arg.id,
  createdAt: undefined,
  updatedAt: undefined,
});

export const fromProjectsDomainToDao = (args: ProjectDomain[]): Project[] =>
  args.map(fromProjectDomainToDao);

export const fromProjectDomainToGQL = (arg: ProjectDomain): ProjectGQL => ({
  name: arg.name,
  id: arg.id,
  employees: arg.employeesId?.map((id) => ({ id })) || [],
});

export const fromProjectsDomainToGQL = (args: ProjectDomain[]): ProjectGQL[] =>
  args.map(fromProjectDomainToGQL);

export const fromProjectGQLCreateToDomain = (
  arg: CreateProjectDTO,
): ProjectDomain => ({
  name: arg.name,
  employeesId: arg.employees,
});

export const fromProjectWithRelToDomain = (
  arg: ProjectWithRel,
): ProjectDomain => ({
  id: arg.id,
  name: arg.name,
  employeesId: arg.employees.map((e) => e.employeeId),
});

export const fromProjectsWithRelToDomain = (
  args: ProjectWithRel[],
): ProjectDomain[] => args.map(fromProjectWithRelToDomain);
