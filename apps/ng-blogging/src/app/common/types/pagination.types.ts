export interface IPageSize {
  page: number;
  size: number;
  totalRecords: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IPaginationResult<T = any> extends IPageSize {
  data: Array<T>;
}

export interface IPageQueryParams {
  page?: number;
  limit?: number;
  q?: string;
}

export const FALLBACK_PAGINATION_RESULT: IPaginationResult = {
  page: 1,
  size: 0,
  totalRecords: 0,
  data: [],
  hasNextPage: false,
  hasPrevPage: false,
} as const;
