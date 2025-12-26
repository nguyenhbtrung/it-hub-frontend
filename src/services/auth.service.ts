'use server';

import { apiFetch } from '@/lib/fetcher/apiFetch';
import { ApiError } from '@/lib/errors/ApiError';

export async function signInUser(payload: any): Promise<any> {
  try {
    return await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false,
    });
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.code === 'INVALID_CREDENTIALS') {
        return {
          success: false,
          error: {
            message: 'Email hoặc mật khẩu không đúng',
            code: err.code,
          },
        };
      }
    }
    throw err;
  }
}
