import { ApiClient } from '@/lib/api/api-client';
import { API_BASE_URL } from '@/lib/api/constants';
import { ChangePasswordPayload, SignInPayload, SignUpPayload } from '../types/auth.types';

export const authApi = {
  async signIn(payload: SignInPayload) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    const setCookieHeader = res.headers.get('set-cookie');

    if (setCookieHeader) {
      const match = setCookieHeader.match(/refreshToken=([^;]+)/);

      if (match) {
        data.data.refreshToken = match[1];
      }
    }

    return data;
  },

  signUp(payload: SignUpPayload) {
    return ApiClient.request('/api/auth/register', {
      method: 'POST',
      auth: false,
      body: JSON.stringify(payload),
    });
  },

  changePassword(payload: ChangePasswordPayload) {
    return ApiClient.request('/api/auth/change-password', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    });
  },
};
