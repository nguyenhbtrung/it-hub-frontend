import { API_BASE_URL, api } from '@/lib/api';
import { ChangePasswordPayload, SignInPayload, SignUpPayload } from '../types/auth.types';

export async function signIn(payload: SignInPayload) {
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
}

export function signUp(payload: SignUpPayload) {
  return api.post('/api/auth/register', payload, {
    auth: false,
  });
}

export function changePassword(payload: ChangePasswordPayload) {
  return api.post('/api/auth/change-password', payload, {
    auth: true,
  });
}
