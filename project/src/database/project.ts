import { Prisma } from '@prisma/client';

export type ProjectWithRel = Prisma.ProjectGetPayload<{
  include: { employees: true };
}>;
