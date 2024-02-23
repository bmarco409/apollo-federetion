import { IPagination } from '../domain/pagination';

export interface IRepository<DOMAIN> {
  create(entity: DOMAIN): Promise<DOMAIN>;
  update(entity: DOMAIN): Promise<DOMAIN>;
  findOne(email: string): Promise<DOMAIN>;
  findMany(pagination: IPagination): Promise<DOMAIN[]>;
  delete(id: number): Promise<void>;
}
