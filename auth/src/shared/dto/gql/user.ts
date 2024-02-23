import {
  Field,
  InputType,
  Int,
  IntersectionType,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class BaseUserDTO {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserDTO extends BaseUserDTO {
  @Field(() => Int)
  @Field()
  id: number;
}

@InputType()
export class CreateUserInput extends BaseUserDTO {}

@InputType()
export class UpdateUserInput extends BaseUserDTO {
  @Field(() => Int)
  id: number;
}

@InputType()
export class CreateUserDTO extends IntersectionType(
  CreateUserInput,
  BaseUserDTO,
) {}

@InputType()
export class UpdateUserDTO extends IntersectionType(
  UpdateUserInput,
  BaseUserDTO,
) {}
