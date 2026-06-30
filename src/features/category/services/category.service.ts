import { api, ApiResponse } from '@/lib/api';
import { GetCategoriesQuery, GetCoursesByCategoryIdQuery } from '../types/category.types';

export function getCoursesByCategoryId(id: string, query: GetCoursesByCategoryIdQuery): Promise<ApiResponse<any>> {
  return api.get(`/api/categories/${id}/courses`, { query });
}

export function getCategorySummary(id: string): Promise<ApiResponse<any>> {
  return api.get(`/api/categories/${id}/summary`);
}

export function getCategoryIdBySlug(slug: string): Promise<ApiResponse<string>> {
  return api.get(`/api/categories/${slug}/id`);
}

export function getCategoryTree(): Promise<ApiResponse<any>> {
  return api.get('/api/categories/tree');
}

export function getCategories({
  page = 1,
  limit = 10,
  all,
  root,
  parentId,
  includeParent,
  q,
}: GetCategoriesQuery = {}): Promise<ApiResponse<any>> {
  return api.get('/api/categories', {
    auth: false,
    query: {
      page,
      limit,
      all,
      root,
      parentId,
      includeParent,
      q,
    },
  });
}
