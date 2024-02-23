import { Field, ObjectType, Int, ArgsType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  nodes: T[];
  totalCount: number;
  hasNextPage: boolean;
}

export function CursorPaginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field((type) => String)
    cursor: string;

    @Field((type) => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field((type) => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field((type) => [classRef], { nullable: true })
    nodes: T[];

    @Field((type) => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}

@ArgsType()
export class PaginationArgsDTO {
  @Field(() => Int, { nullable: true })
  first: number;

  @Field(() => String, { nullable: true })
  after: string;

  @Field(() => Int, { nullable: true })
  last: number;

  @Field(() => String, { nullable: true })
  before: string;
}

@ArgsType()
export class PaginationOffsetArgsDTO {
  @Field(() => Int, { nullable: true })
  currentpage: number;
  @Field(() => Int, { nullable: true })
  totalCount: number;
  @Field(() => Int, { nullable: true })
  nextPage: number;
  @Field(() => Int, { nullable: true })
  prevPage: number;
  @Field(() => Int, { nullable: true })
  numberOfItems: number;
}

export interface IPaginatedOffsetType<T> {
  currentpage: number;
  totalCount: number;
  nextPage: number;
  prevPage: number;
  numberOfItems: number;
  nodes: T[];
}

export function OffsetPaginated<T>(
  classRef: Type<T>,
): Type<IPaginatedOffsetType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field((type) => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedOffsetType<T> {
    @Field((type) => [classRef], { nullable: true })
    nodes: T[];
    @Field(() => Int, { nullable: true })
    currentpage: number;
    @Field(() => Int, { nullable: true })
    totalCount: number;
    @Field(() => Int, { nullable: true })
    nextPage: number;
    @Field(() => Int, { nullable: true })
    prevPage: number;
    @Field(() => Int, { nullable: true })
    numberOfItems: number;
  }
  return PaginatedType as Type<IPaginatedOffsetType<T>>;
}
