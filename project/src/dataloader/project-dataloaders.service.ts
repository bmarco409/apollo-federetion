import { Inject, Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Project } from 'src/shared/domain/project';
import { IDataloaders } from 'src/shared/interface/dataloader.interface';
import { IRepository } from 'src/shared/interface/repository.interface';

@Injectable()
export class ProjectDataloaderService {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly repository: IRepository<Project>,
  ) {}

  getLoaders(): IDataloaders<Project[]> {
    const projectsLoader = this.projectsDataLoader();
    return {
      projectsLoader,
    };
  }

  projectsDataLoader(): DataLoader<number, Project[], number> {
    return new DataLoader<number, Project[]>(
      async (keys: readonly number[]) =>
        await this.getProjectsByBatch(keys as number[]),
    );
  }

  private async getProjectsByBatch(keys: number[]): Promise<Project[][]> {
    const res = await this.repository.findByEmployees(keys);

    const mappedResults = this.mapResultToIds(keys, res);
    return mappedResults;
  }

  private mapResultToIds(
    projectsId: number[],
    projects: Project[],
  ): Project[][] {
    return projectsId.map(
      (id) =>
        projects.filter((project: Project) =>
          project.employeesId.includes(id),
        ) || null,
    );
  }
}
