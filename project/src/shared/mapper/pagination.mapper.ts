import { IPagination } from '../domain/pagination';
import { PaginationOffsetArgsDTO } from '../dto/gql/paginate';

export const fromPaginationOffsetToDomain = <T>(
  arg: PaginationOffsetArgsDTO,
): IPagination => ({
  currentpage: arg.currentpage,
  nextPage: arg.nextPage,
  prevPage: arg.prevPage,
  totalCount: arg.totalCount,
  nuberOfItems: arg.numberOfItems,
});

export const fromPaginationDomainToOffset = <T>(
  arg: IPagination,
): PaginationOffsetArgsDTO => ({
  currentpage: arg.currentpage,
  nextPage: arg.nextPage,
  prevPage: arg.prevPage,
  totalCount: arg.totalCount,
  numberOfItems: arg.nuberOfItems,
});
