import { User } from '../domain/user';
import { IRepository } from './repository.interface';

export interface IUpdateRefreshToken {
  updateRefreshToken(
    email: string,
    refreshToken: string | string,
  ): Promise<User>;
}

export interface IUserRepository
  extends IUpdateRefreshToken,
    IRepository<User> {}
