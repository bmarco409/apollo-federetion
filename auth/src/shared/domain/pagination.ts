export interface IPagination {
  readonly currentpage: number;
  readonly totalCount: number;
  readonly nextPage: number;
  readonly prevPage: number;
  readonly nuberOfItems: number;
}
