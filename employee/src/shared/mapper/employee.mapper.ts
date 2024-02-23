import { Employee } from '@prisma/client';
import { Employee as EmployeeDomain } from '../domain/employee';
import {
  fromRoleDaoToDomain,
  fromRoleDomainToDao,
  fromRoleDomainToGQL,
  fromRoleGQLToDomain,
} from './role.mapper';
import {
  CreateEmployeeDTO,
  EmployeeDTO as EmployeeGQL,
} from 'src/shared/dto/gql/employee';

export const fromEmployeeDaoToDomain = (dao: Employee): EmployeeDomain => ({
  id: dao.id,
  name: dao.name,
  role: fromRoleDaoToDomain(dao.role),
  surname: dao.surname,
});

export const fromEmployeeDomainToDao = (entity: EmployeeDomain): Employee => ({
  id: entity.id,
  name: entity.name,
  role: fromRoleDomainToDao(entity.role),
  surname: entity.surname,
  createdAt: undefined,
  updatedAt: undefined,
});

export const fromEmployeesDaoToDomain = (dao: Employee[]): EmployeeDomain[] =>
  dao.map(fromEmployeeDaoToDomain);

export const fromEmployeeDomainToGQL = (
  entity: EmployeeDomain,
): EmployeeGQL => ({
  id: entity.id,
  name: entity.name,
  role: fromRoleDomainToGQL(entity.role),
  surname: entity.surname,
});

export const fromEmployeesDomainToGQL = (
  dao: EmployeeDomain[],
): EmployeeGQL[] => dao.map(fromEmployeeDomainToGQL);

export const fromEmployeeGQLToDomain = (
  entity: EmployeeGQL,
): EmployeeDomain => ({
  id: entity.id,
  name: entity.name,
  role: fromRoleGQLToDomain(entity.role),
  surname: entity.surname,
});

export const fromEmployeeGQLCreateToDomain = (
  entity: CreateEmployeeDTO,
): EmployeeDomain => ({
  name: entity.name,
  role: fromRoleGQLToDomain(entity.role),
  surname: entity.surname,
});
