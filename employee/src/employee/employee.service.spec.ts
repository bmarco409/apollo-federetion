import { Test } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './employee.repository';
import { Employee } from 'src/shared/domain/employee';
import { Role } from 'src/shared/domain/role';
import { EmployeeDao } from 'src/database/employee.dao';
import { PrismaProvider } from 'src/database/prisma.provider';

describe('Employee service', () => {
  let employeeService: EmployeeService;
  let employeeRepository: EmployeeRepository;
  let employeeDao: EmployeeDao;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: 'EMPLOYEE_REPOSITORY',
          useClass: EmployeeRepository,
        },
        EmployeeDao,
        PrismaProvider,
      ],
    }).compile();

    employeeService = moduleRef.get<EmployeeService>(EmployeeService);
    employeeRepository = moduleRef.get<EmployeeRepository>(
      'EMPLOYEE_REPOSITORY',
    );
    employeeDao = moduleRef.get<EmployeeDao>(EmployeeDao);
  });

  describe('findAll', () => {
    it('should return an array of employee', async () => {
      const result: Employee[] = [
        {
          name: 'John',
          role: Role.TEAM_LEADER,
          surname: 'Doe',
          id: 1,
        },
      ];
      jest
        .spyOn(employeeRepository, 'findMany')
        .mockImplementation(() => Promise.all(result));

      expect(await employeeService.findMany()).toEqual(result);
    });
  });
});
