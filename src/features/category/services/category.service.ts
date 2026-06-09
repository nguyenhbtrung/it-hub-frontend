import { ApiClient, ApiResponse } from '@/lib/api';
import { GetCategoriesQuery, GetCoursesByCategoryIdQuery } from '../types/category.types';

export function getCoursesByCategoryId(id: string, query: GetCoursesByCategoryIdQuery): Promise<ApiResponse<any>> {
  return ApiClient.request(`/api/categories/${id}/courses`, { query });
}

export function getCategorySummary(id: string): Promise<ApiResponse<any>> {
  return ApiClient.request(`/api/categories/${id}/summary`);
}

export function getCategoryIdBySlug(slug: string): Promise<ApiResponse<string>> {
  return ApiClient.request(`/api/categories/${slug}/id`);
}

export function getCategoryTree(): Promise<ApiResponse<any>> {
  return ApiClient.request('/api/categories/tree');
}

export function getCategories({ page = 1, limit = 10, all, root, parentId }: GetCategoriesQuery = {}): Promise<
  ApiResponse<any>
> {
  return ApiClient.request('/api/categories', {
    auth: false,
    query: {
      page,
      limit,
      all,
      root,
      parentId,
    },
  });
}
