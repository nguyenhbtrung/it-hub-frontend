'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { apiFetch } from '@/lib/fetcher/apiFetch';
import { UserRole, UserScope, UserStatus } from '@/types/user';
import { cache } from 'react';

export const getUsers = cache(
  async (query: {
    page?: number;
    limit?: number;
    q?: string | string[];
    sortBy?: string | string[];
    sortOrder?: string | string[];
  }): Promise<any> => {
    try {
      return await apiFetch(`/api/users`, {
        auth: true,
        query,
        credentials: 'include',
      });
    } catch (err) {
      if (err instanceof ApiError) {
        return {
          success: false,
          error: {
            message: 'Có lỗi xảy ra',
            code: err.code,
          },
        };
      }
      throw err;
    }
  }
);

export const getUserById = cache(async (id: string): Promise<any> => {
  try {
    return await apiFetch(`/api/users/${id}`, {
      auth: true,
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
          credentials: 'include',
        },
      };
    }
    throw err;
  }
});

export const getMyProfile = cache(async (): Promise<any> => {
  try {
    return await apiFetch(`/api/users/me/profile`, {
      auth: true,
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
          credentials: 'include',
        },
      };
    }
    throw err;
  }
});

export const updateUser = async (
  id: string,
  payload: {
    email?: string;
    fullname?: string | null;
    school?: string | null;
    specialized?: string | null;
    bio?: string | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    websiteUrl?: string | null;
    role?: UserRole;
    status?: UserStatus;
    scope?: UserScope;
  }
): Promise<any> => {
  try {
    return await apiFetch(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      auth: true,
      credentials: 'include',
    });
  } catch (err) {
    if (err instanceof ApiError) {
      const res = {
        success: false,
        error: {
          message: 'Lưu thay đổi không thành công, vui lòng thử lại',
          code: err.code,
        },
      };
      if (err.code === 'FORBIDDEN') {
        res.error.message = 'Bạn không có quyền cập nhật người dùng này';
      } else if (err.code === 'RECORD_ALREADY_EXISTS') {
        res.error.message = 'Email bạn nhập đã tồn tại';
      }
      return res;
    }
    throw err;
  }
};

export const updateMyProfile = async (payload: {
  avatarId?: string | null;
  fullname?: string | null;
  school?: string | null;
  specialized?: string | null;
  bio?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
}): Promise<any> => {
  try {
    return await apiFetch(`/api/users/me/profile`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      auth: true,
      credentials: 'include',
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Lưu thay đổi không thành công, vui lòng thử lại',
          code: err.code,
        },
      };
    }
    throw err;
  }
};
