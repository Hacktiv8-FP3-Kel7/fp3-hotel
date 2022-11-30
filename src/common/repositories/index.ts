export interface ApiResult<T> {
  data: T;
}

export interface PaginationMeta {
  count: number;
  total: number;
  next: string;
  prev: null;
}

export interface ExtendedApiResult<T> extends ApiResult<T> {
  pagination: PaginationMeta;
}
