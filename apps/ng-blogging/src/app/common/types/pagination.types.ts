export interface IPaginationResult<T> {
  page: number;
  size: number;
  totalRecords: number;
  data: Array<T>;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IPageQueryParams {
  page?: number;
  limit?: number;
  q?: string;
}
