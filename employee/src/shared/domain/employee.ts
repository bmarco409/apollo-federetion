import { Role } from './role';

export interface Employee {
  readonly id?: number;
  readonly name: string;
  readonly surname: string;
  readonly role: Role;
}
