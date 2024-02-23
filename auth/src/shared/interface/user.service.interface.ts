import { User } from '../domain/user';
import { IService } from './service.interface';

export interface IUpdateRefreshToken {
  updateRefreshToken(
    email: string,
    refreshToken: string | string,
  ): Promise<User>;
}

export interface IUserService extends IUpdateRefreshToken, IService<User> {}
