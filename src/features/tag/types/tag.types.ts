export interface GetTagsQuery {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string | string[];
  sortOrder?: string | string[];
}
