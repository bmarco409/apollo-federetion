export interface IService<DOMAIN> {
  create(entity: DOMAIN): Promise<DOMAIN>;
  update(entity: DOMAIN): Promise<DOMAIN>;
  findOne(id: number): Promise<DOMAIN>;
  findMany(): Promise<DOMAIN[]>;
  delete(id: number): Promise<void>;
}
