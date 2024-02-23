import { Directive, ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ProjectDTO } from './project';

@ObjectType()
@Directive('@key(fields: "id")')
export class EmployeeDTO {
  @Field(() => Int)
  id: number;

  @Field(() => [ProjectDTO])
  projects?: ProjectDTO[];
}
