import {
  ObjectType,
  Field,
  InputType,
  Int,
  IntersectionType,
  Directive,
} from '@nestjs/graphql';
import { EmployeeDTO } from './employee';
import { CursorPaginated, OffsetPaginated } from './paginate';

@ObjectType()
export class BaseProjectDTO {
  @Field()
  name: string;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class ProjectDTO extends BaseProjectDTO {
  @Field(() => Int)
  id: number;

  @Field(() => [EmployeeDTO])
  employees?: EmployeeDTO[];
}

@InputType()
export class CreateProjectInput extends BaseProjectDTO {
  @Field(() => [Int], { nullable: true })
  employees?: number[];
}

@InputType()
@Directive('@key(fields: "id")')
export class UpdateProjectInput {
  @Field()
  id: number;
  @Field(() => [Int], { nullable: true })
  employees?: number[];
}

@InputType()
export class CreateProjectDTO extends IntersectionType(
  CreateProjectInput,
  BaseProjectDTO,
) {}

@InputType()
export class UpdateProjectDTO extends IntersectionType(
  UpdateProjectInput,
  BaseProjectDTO,
) {}

@ObjectType()
export class PaginatedCursorProjectDTO extends CursorPaginated(ProjectDTO) {}

@ObjectType()
export class PaginatedOffsetProjectDTO extends OffsetPaginated(ProjectDTO) {}
