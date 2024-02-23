import { Injectable, Inject } from '@nestjs/common';
import { EmployeeDao } from 'src/database/employee.dao';
import { Employee } from 'src/shared/domain/employee';
import { IRepository } from 'src/shared/interface/repository.interface';
import {
  fromEmployeeDaoToDomain,
  fromEmployeeDomainToDao,
  fromEmployeesDaoToDomain,
} from 'src/shared/mapper/employee.mapper';

@Injectable()
export class EmployeeRepository implements IRepository<Employee> {
  constructor(private dao: EmployeeDao) {}

  async create(entity: Employee): Promise<Employee> {
    const employee = await this.dao.create(fromEmployeeDomainToDao(entity));
    return fromEmployeeDaoToDomain(employee);
  }

  async update(entity: Employee): Promise<Employee> {
    const employee = await this.dao.update({
      where: {
        id: entity.id,
      },
      data: fromEmployeeDomainToDao(entity),
    });
    return fromEmployeeDaoToDomain(employee);
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.dao.findOne({
      id,
    });

    return fromEmployeeDaoToDomain(employee);
  }

  async findMany(): Promise<Employee[]> {
    const employees = await this.dao.findMany({});
    return fromEmployeesDaoToDomain(employees);
  }

  delete(id: number): Promise<void> {
    this.dao.delete({ id });
    return;
  }
}
