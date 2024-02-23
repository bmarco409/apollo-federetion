import {
  Directive,
  Field,
  ID,
  InputType,
  Int,
  IntersectionType,
  ObjectType,
} from '@nestjs/graphql';
import { Role } from './role';

@ObjectType()
export class BaseEmployeeDTO {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field(() => Role)
  role: Role;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class EmployeeDTO extends BaseEmployeeDTO {
  @Field((type) => Int)
  id: number;
}
@InputType()
export class CreateEmployeeInput extends BaseEmployeeDTO {}

@InputType()
@Directive('@key(fields: "id")')
export class UpdateEmployeeInput {
  @Field((type) => Int)
  id: number;
}

@InputType()
export class CreateEmployeeDTO extends IntersectionType(
  CreateEmployeeInput,
  BaseEmployeeDTO,
) {}

@InputType()
export class UpdateEmployeeDTO extends IntersectionType(
  UpdateEmployeeInput,
  BaseEmployeeDTO,
) {}
