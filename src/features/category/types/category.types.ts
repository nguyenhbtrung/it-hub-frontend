export interface GetCoursesByCategoryIdQuery {
  page?: number;
  limit?: number;
  level?: string | string[];
  duration?: string | string[];
  avgRating?: string | string[];
  sortBy?: string | string[];
}

export interface GetCategoriesQuery {
  page?: number;
  limit?: number;
  all?: boolean;
  root?: boolean;
  parentId?: string;
  sortBy?: string;
  sortOrder?: string;
  q?: string;
}
