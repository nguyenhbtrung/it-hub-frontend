'use server';
import { auth } from '@/auth';
import { API_BASE_URL, REFRESH_ENDPOINT } from './constants';

export async function refreshAccessToken(): Promise<any> {
  const session = await auth();
  const res = await fetch(`${API_BASE_URL}${REFRESH_ENDPOINT}`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Cookie: `refreshToken=${session?.refreshToken || ''}`,
    },
  });

  if (!res.ok) return { success: false };

  const json = await res.json();

  const setCookieHeader = res.headers.get('set-cookie');
  if (setCookieHeader) {
    const match = setCookieHeader.match(/refreshToken=([^;]+)/);
    if (match) {
      json.data.refreshToken = match[1];
    }
  }
  return json;
}
