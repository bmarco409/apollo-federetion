import { User } from 'src/shared/domain/user';
import { User as UserDao } from '@prisma/client';
import { CreateUserDTO, UserDTO } from '../dto/gql/user';

export const fromUserDomainToDao = (arg: User): UserDao => ({
  email: arg.email,
  id: arg.id,
  password: arg.password,
});

export const fromUsersDomainToDao = (args: User[]): UserDao[] =>
  args.map(fromUserDomainToDao);

export const fromUserDaoToDomain = (arg: UserDao): User => ({
  email: arg.email,
  id: arg.id,
  password: arg.password,
});

export const fromUsersDaoToDomain = (args: UserDao[]): User[] =>
  args.map(fromUserDaoToDomain);

export const fromUserDomainToGQL = (arg: User): UserDTO => ({
  email: arg.email,
  id: arg.id,
  password: arg.password,
});

export const fromCreateUserGQLToDomain = (arg: CreateUserDTO): User => ({
  email: arg.email,
  password: arg.password,
});
