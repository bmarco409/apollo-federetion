import { Injectable } from '@nestjs/common';
import { UserDao } from 'src/prisma/user.dao';
import { IPagination } from 'src/shared/domain/pagination';
import { User } from 'src/shared/domain/user';
import { IRepository } from 'src/shared/interface/repository.interface';
import {
  fromUserDaoToDomain,
  fromUserDomainToDao,
  fromUsersDaoToDomain,
} from 'src/shared/mapper/user.mapper';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from 'src/shared/interface/user-repository.interface';

const saltOrRounds = 10;

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private dao: UserDao) {}

  async create(entity: User): Promise<User> {
    const hash = await bcrypt.hash(entity.password, saltOrRounds);

    const user = await this.dao.create(fromUserDomainToDao(entity));
    return fromUserDaoToDomain({ ...user, password: hash });
  }

  async update(entity: User): Promise<User> {
    const user = await this.dao.update({
      where: {
        id: entity.id,
      },
      data: fromUserDomainToDao(entity),
    });
    return fromUserDaoToDomain(user);
  }

  async findOne(email: string): Promise<User> {
    const user = await this.dao.findOne({
      email,
    });

    return fromUserDaoToDomain(user);
  }

  async findMany(pagination: IPagination): Promise<User[]> {
    const users = await this.dao.findMany({
      skip: pagination.currentpage,
      take: pagination.nuberOfItems,
    });
    return fromUsersDaoToDomain(users);
  }

  delete(id: number): Promise<void> {
    this.dao.delete({ id });
    return;
  }

  async updateRefreshToken(
    email: string,
    refreshToken: string | string,
  ): Promise<User> {
    return this.dao.update({
      where: {
        email,
      },
      data: {
        refresh_token: refreshToken,
      },
    });
  }
}
