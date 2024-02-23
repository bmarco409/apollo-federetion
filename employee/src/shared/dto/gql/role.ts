import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  PROJECT_MANAGER = 'Project Manager',
  DEVELOPER = 'Developer',
  TEAM_LEADER = 'Team Leader',
}

registerEnumType(Role, {
  name: 'Role',
});
