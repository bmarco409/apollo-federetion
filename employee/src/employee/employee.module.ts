import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeRepository } from './employee.repository';
import { EmployeeService } from './employee.service';
import { EmployeeDao } from 'src/database/employee.dao';
import { PrismaProvider } from 'src/database/prisma.provider';

@Module({
  providers: [
    EmployeeDao,
    EmployeeResolver,
    {
      provide: 'EMPLOYEE_REPOSITORY',
      useClass: EmployeeRepository,
    },
    {
      provide: 'EMPLOYEE_SERVICE',
      useClass: EmployeeService,
    },
    PrismaProvider,
  ],
})
export class EmployeeModule {}
