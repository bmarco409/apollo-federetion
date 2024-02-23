import { IPagination } from '../domain/pagination';

export interface IDao<DAO_ENTITY, FILTER> {
  create(entity: DAO_ENTITY): Promise<DAO_ENTITY>;
  update(entity: DAO_ENTITY): Promise<DAO_ENTITY>;
  findOne(filter: FILTER): Promise<DAO_ENTITY>;
  findMany(pagination: IPagination): Promise<DAO_ENTITY[]>;
  delete(id: number): Promise<void>;
}
