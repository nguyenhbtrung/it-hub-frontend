import { ApiClient, ApiResponse } from '@/lib/api';
import { GetCategoriesQuery, GetCoursesByCategoryIdQuery } from '../types/category.types';

export const categoryApi = {
  getCoursesByCategoryId(id: string, query: GetCoursesByCategoryIdQuery): Promise<ApiResponse<any>> {
    return ApiClient.request(`/api/categories/${id}/courses`, { query });
  },

  getCategorySummary(id: string): Promise<ApiResponse<any>> {
    return ApiClient.request(`/api/categories/${id}/summary`);
  },

  getCategoryIdBySlug(slug: string): Promise<ApiResponse<string>> {
    return ApiClient.request(`/api/categories/${slug}/id`);
  },

  getCategoryTree(): Promise<ApiResponse<any>> {
    return ApiClient.request('/api/categories/tree');
  },

  getCategories({ page = 1, limit = 10, all, root, parentId }: GetCategoriesQuery = {}): Promise<ApiResponse<any>> {
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
  },
};
