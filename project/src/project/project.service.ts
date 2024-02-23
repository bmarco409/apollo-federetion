import { Injectable, Inject } from '@nestjs/common';
import { IPagination } from 'src/shared/domain/pagination';
import { Project } from 'src/shared/domain/project';
import { IRepository } from 'src/shared/interface/repository.interface';
import { IService } from 'src/shared/interface/service.interface';

@Injectable()
export class ProjectService implements IService<Project> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly repository: IRepository<Project>,
  ) {}

  create(entity: Project): Promise<Project> {
    return this.repository.create(entity);
  }
  update(entity: Project): Promise<Project> {
    return this.repository.update(entity);
  }
  findOne(id: number): Promise<Project> {
    return this.repository.findOne(id);
  }
  findMany(pagination: IPagination): Promise<Project[]> {
    return this.repository.findMany(pagination);
  }
  delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
  findByEmployees(ids: number[]): Promise<Project[]> {
    return this.repository.findByEmployees(ids);
  }
}
