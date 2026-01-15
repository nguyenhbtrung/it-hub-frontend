'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { apiFetch } from '@/lib/fetcher/apiFetch';
import { cache } from 'react';

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
        },
      };
    }
    throw err;
  }
});

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
};
