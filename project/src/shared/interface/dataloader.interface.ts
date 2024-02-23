import * as DataLoader from 'dataloader';

export interface IDataloaders<T> {
  projectsLoader: DataLoader<number, T>;
}
