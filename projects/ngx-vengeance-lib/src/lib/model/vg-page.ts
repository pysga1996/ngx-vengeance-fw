export interface VgPage<T> {
  content: T[];
  first?: boolean;
  last?: boolean;
  pageable?: VgPageable;
  totalPages: number;
}

export interface VgPageable {
  pageSize: number;
  pageNumber: number;
}
