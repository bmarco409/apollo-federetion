import { Injectable, Inject } from '@nestjs/common';
import { Employee } from 'src/shared/domain/employee';
import { IRepository } from 'src/shared/interface/repository.interface';
import { IService } from 'src/shared/interface/service.interface';

@Injectable()
export class EmployeeService implements IService<Employee> {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly repository: IRepository<Employee>,
  ) {}
  create(entity: Employee): Promise<Employee> {
    return this.repository.create(entity);
  }
  update(entity: Employee): Promise<Employee> {
    return this.repository.update(entity);
  }
  findOne(id: number): Promise<Employee> {
    return this.repository.findOne(id);
  }
  findMany(): Promise<Employee[]> {
    return this.repository.findMany();
  }
  delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
