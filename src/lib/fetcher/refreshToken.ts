import { API_BASE_URL, REFRESH_ENDPOINT } from './constants';

export async function refreshAccessToken(): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}${REFRESH_ENDPOINT}`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
  });

  return res.ok;
}
