import { Inject, Injectable } from '@nestjs/common';
import { IPagination } from 'src/shared/domain/pagination';
import { User } from 'src/shared/domain/user';
import { IRepository } from 'src/shared/interface/repository.interface';
import { IUserRepository } from 'src/shared/interface/user-repository.interface';
import { IUserService } from 'src/shared/interface/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('USER_REPOSITORY') private repository: IUserRepository) {}
  updateRefreshToken(email: string, refreshToken: string): Promise<User> {
    return this.repository.updateRefreshToken(email, refreshToken);
  }
  create(entity: User): Promise<User> {
    return this.repository.create(entity);
  }
  update(entity: User): Promise<User> {
    return this.repository.update(entity);
  }
  findOne(email: string): Promise<User> {
    return this.repository.findOne(email);
  }
  findMany(pagination?: IPagination): Promise<User[]> {
    return this.repository.findMany(pagination);
  }
  delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
