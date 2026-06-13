import { api } from '@/lib/api';
import { ApiResponse } from '@/lib/api/types';

export async function getInstructorDashboardSummary(): Promise<ApiResponse<any>> {
  return api.get('/api/dashboard/instructor/summary', {
    auth: true,
  });
}

export async function getStudentGrowthOfInstructor(): Promise<ApiResponse<any>> {
  return api.get('/api/dashboard/instructor/student-growth', {
    auth: true,
  });
}

export async function getRecentActivitiesOfInstructor(): Promise<ApiResponse<any>> {
  return api.get('/api/dashboard/instructor/recent-activity', {
    auth: true,
  });
}

export async function getAdminDashboardSummary(): Promise<ApiResponse<any>> {
  return api.get('/api/dashboard/admin/summary', {
    auth: true,
  });
}

export async function getCourseRegistrationGrowthOfAdmin(): Promise<ApiResponse<any>> {
  return api.get('/api/dashboard/admin/course-registration-growth', {
    auth: true,
  });
}

export async function getUserGrowthOfAdmin(): Promise<ApiResponse<any>> {
  return api.get('/api/dashboard/admin/user-growth', {
    auth: true,
  });
}
