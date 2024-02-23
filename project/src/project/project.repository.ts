import { Injectable, Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProjectDao } from 'src/database/project.dao';
import { IPagination } from 'src/shared/domain/pagination';
import { Project } from 'src/shared/domain/project';
import { IRepository } from 'src/shared/interface/repository.interface';
import {
  fromProjectDaoToDomain,
  fromProjectDomainToDao,
  fromProjectWithRelToDomain,
  fromProjectsDaoToDomain,
  fromProjectsWithRelToDomain,
} from 'src/shared/mapper/project.mapper';

@Injectable()
export class ProjectRepository implements IRepository<Project> {
  constructor(private dao: ProjectDao) {}

  async create(entity: Project): Promise<Project> {
    const project = await this.dao.create(
      fromProjectDomainToDao(entity),
      entity.employeesId,
    );
    return fromProjectWithRelToDomain(project);
  }

  async update(entity: Project): Promise<Project> {
    const project = await this.dao.update({
      where: {
        id: entity.id,
      },
      data: fromProjectDomainToDao(entity),
    });
    return fromProjectWithRelToDomain(project);
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.dao.findOne({
      id,
    });

    return fromProjectWithRelToDomain(project);
  }

  async findMany(pagination: IPagination): Promise<Project[]> {
    const projects = await this.dao.findMany({
      skip: pagination.currentpage,
      take: pagination.nuberOfItems,
    });
    return fromProjectsWithRelToDomain(projects);
  }

  delete(id: number): Promise<void> {
    this.dao.delete({ id });
    return;
  }

  async findByEmployees(ids: number[]): Promise<Project[]> {
    const projects = await this.dao.findMany({
      where: {
        employees: {
          every: {
            employeeId: {
              in: ids,
            },
          },
        },
      },
    });
    return fromProjectsWithRelToDomain(projects);
  }
}
