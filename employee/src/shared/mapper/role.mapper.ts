import { Role } from '@prisma/client';
import { Role as RoleDomain } from '../domain/role';
import { Role as RoleGQL } from 'src/shared/dto/gql/role';

export const fromRoleDaoToDomain = (dao: Role): RoleDomain => {
  switch (dao) {
    case Role.DEVELOPER:
      return RoleDomain.DEVELOPER;
    case Role.TEAM_LEADER:
      return RoleDomain.TEAM_LEADER;
    case Role.PROJECT_MANAGER:
      return RoleDomain.PROJECT_MANAGER;
    default:
      return RoleDomain.DEVELOPER;
  }
};

export const fromRoleDomainToDao = (entity: RoleDomain): Role => {
  switch (entity) {
    case RoleDomain.DEVELOPER:
      return Role.DEVELOPER;
    case RoleDomain.TEAM_LEADER:
      return Role.TEAM_LEADER;
    case RoleDomain.PROJECT_MANAGER:
      return Role.PROJECT_MANAGER;
    default:
      return Role.DEVELOPER;
  }
};

export const fromRoleDomainToGQL = (entity: RoleDomain): RoleGQL => {
  switch (entity) {
    case RoleDomain.DEVELOPER:
      return RoleGQL.DEVELOPER;
    case RoleDomain.TEAM_LEADER:
      return RoleGQL.TEAM_LEADER;
    case RoleDomain.PROJECT_MANAGER:
      return RoleGQL.PROJECT_MANAGER;
    default:
      return RoleGQL.DEVELOPER;
  }
};

export const fromRoleGQLToDomain = (entity: RoleGQL): RoleDomain => {
  switch (entity) {
    case RoleGQL.DEVELOPER:
      return RoleDomain.DEVELOPER;
    case RoleGQL.TEAM_LEADER:
      return RoleDomain.TEAM_LEADER;
    case RoleGQL.PROJECT_MANAGER:
      return RoleDomain.PROJECT_MANAGER;
    default:
      return RoleDomain.DEVELOPER;
  }
};
