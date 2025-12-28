'use server';

import { apiFetch } from '@/lib/fetcher/apiFetch';
import { ApiError } from '@/lib/errors/ApiError';
import { API_BASE_URL } from '@/lib/fetcher/constants';

export async function signInUser(payload: any): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const setCookieHeader = res.headers.get('set-cookie');

    const data = await res.json();
    if (setCookieHeader) {
      const match = setCookieHeader.match(/refreshToken=([^;]+)/);
      if (match) {
        data.data.refreshToken = match[1];
      }
    }
    return data;

    // return await apiFetch('/api/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify(payload),
    //   credentials: 'include',
    //   auth: false,
    // });
  } catch (err: any) {
    if (err.code === 'INVALID_CREDENTIALS') {
      return {
        success: false,
        error: {
          message: 'Email hoặc mật khẩu không đúng',
          code: err.code,
        },
      };
    }
    return {
      success: false,
      error: {
        message: 'Có lỗi xảy ra',
        code: err.code,
      },
    };
  }
}
