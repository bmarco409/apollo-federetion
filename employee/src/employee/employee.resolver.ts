import { Inject } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import {
  CreateEmployeeDTO,
  EmployeeDTO,
  UpdateEmployeeDTO,
} from 'src/shared/dto/gql/employee';
import { Employee as EmployeeDomain } from 'src/shared/domain/employee';
import { IService } from 'src/shared/interface/service.interface';
import {
  fromEmployeeDomainToGQL,
  fromEmployeeGQLCreateToDomain,
  fromEmployeesDomainToGQL,
} from 'src/shared/mapper/employee.mapper';

@Resolver(() => EmployeeDTO)
export class EmployeeResolver {
  constructor(
    @Inject('EMPLOYEE_SERVICE')
    private readonly employeeService: IService<EmployeeDomain>,
  ) {}

  @Query(() => EmployeeDTO)
  async employee(@Args({ name: 'id' }) id: number): Promise<EmployeeDTO> {
    const res = await this.employeeService.findOne(id);
    return fromEmployeeDomainToGQL(res);
  }

  @Query(() => [EmployeeDTO])
  async employees(): Promise<EmployeeDTO[]> {
    const res = await this.employeeService.findMany();
    return fromEmployeesDomainToGQL(res);
  }

  @Mutation(() => EmployeeDTO)
  async createEmployee(
    @Args('employee') employee: CreateEmployeeDTO,
  ): Promise<EmployeeDTO> {
    const res = await this.employeeService.create(
      fromEmployeeGQLCreateToDomain(employee),
    );

    return fromEmployeeDomainToGQL(res);
  }

  @Mutation(() => EmployeeDTO)
  async updateEmployee(
    @Args('employee') employee: UpdateEmployeeDTO,
  ): Promise<EmployeeDTO> {
    const res = await this.employeeService.update(
      fromEmployeeGQLCreateToDomain(employee),
    );

    return fromEmployeeDomainToGQL(res);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: number;
    id: number;
  }): Promise<EmployeeDTO> {
    const res = await this.employeeService.findOne(reference.id);
    return fromEmployeeDomainToGQL(res);
  }
}
