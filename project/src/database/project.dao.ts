import { Injectable } from '@nestjs/common';
import { Project, Prisma, EmployeesOnProjects } from '@prisma/client';
import { Nullable } from 'src/shared/type';
import { PrismaProvider } from 'src/database/prisma.provider';
import { ProjectWithRel } from './project';

@Injectable()
export class ProjectDao {
  constructor(private prisma: PrismaProvider) {}

  async findOne(
    projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput,
  ): Promise<Nullable<ProjectWithRel>> {
    return this.prisma.project.findUnique({
      where: projectWhereUniqueInput,
      include: {
        employees: true,
      },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput;
    includeRel?: boolean;
  }): Promise<ProjectWithRel[]> {
    const { skip, take, cursor, where, orderBy, includeRel = true } = params;
    return this.prisma.project.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        employees: includeRel,
      },
    });
  }

  async create(
    input: Prisma.ProjectCreateInput,
    employeesId?: number[],
  ): Promise<ProjectWithRel> {
    const employees = employeesId?.map((value) => ({
      employeeId: value,
    })) as { employeeId: number }[];

    const project = await this.prisma.project.create({
      data: {
        ...input,
        employees: {
          create: employees,
        },
      },
      include: {
        employees: true,
      },
    });

    return project;
  }

  async update(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<ProjectWithRel> {
    const { where, data } = params;
    return this.prisma.project.update({
      data,
      where,
      include: {
        employees: true,
      },
    });
  }

  async delete(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    return this.prisma.project.delete({
      where,
      include: {
        employees: true,
      },
    });
  }
}
