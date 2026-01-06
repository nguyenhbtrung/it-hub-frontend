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

interface SignUpPayload {
  email: string;
  password: string;
}

export async function SignUp(payload: SignUpPayload): Promise<any> {
  try {
    return await apiFetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      let message = 'Có lỗi xảy ra';
      if (err.code === 'VALIDATION_ERROR') {
        switch (err.errors?.[0]?.message) {
          case 'Invalid email format':
            message = 'Định dạng email không hợp lệ';
            break;
          case 'Password must be at least 8 characters':
            message = 'Mật khẩu phải có ít nhất 8 ký tự';
            break;
          case 'Password must contain at least one uppercase letter':
            message = 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa';
            break;
          case 'Password must contain at least one lowercase letter':
            message = 'Mật khẩu phải chứa ít nhất một chữ cái viết thường';
            break;
          case 'Password must contain at least one number':
            message = 'Mật khẩu phải chứa ít nhất một chữ số';
            break;
          case 'Name must be at least 2 characters':
            message = 'Tên phải có ít nhất 2 ký tự';
            break;
          default:
            message = 'Có lỗi xảy ra trong quá trình xác thực';
            break;
        }
      }
      if (err.code === 'CONFLICT') {
        message = 'Email này đã được sử dụng, vui lòng dùng email khác';
      }
      return {
        success: false,
        error: {
          message: message,
          code: err.code,
        },
      };
    }
    throw err;
  }
}
