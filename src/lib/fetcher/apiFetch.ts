import { auth } from '@/auth';
import { API_BASE_URL } from './constants';
import { refreshAccessToken } from './refreshToken';
import { ApiFetchOptions } from './types';
import { ApiError } from '../errors/ApiError';

export async function apiFetch<T>(endpoint: string, options: ApiFetchOptions = {}): Promise<T> {
  const { auth: needAuth = true, retry = true, headers, ...rest } = options;

  const session = needAuth ? await auth() : null;
  const accessToken = session?.accessToken;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: {
      ...(headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'no-store',
  });

  // ===== Access token hết hạn =====
  if (res.status === 401 && needAuth && retry) {
    const refreshed = await refreshAccessToken();

    if (!refreshed) {
      const error = await parseError(res);
      throw new ApiError(res.status, 'UNAUTHORIZED', error.code);
    }

    // Retry request 1 lần
    return apiFetch<T>(endpoint, {
      ...options,
      retry: false,
    });
  }

  if (!res.ok) {
    const error = await parseError(res);

    throw new ApiError(res.status, error.message || 'UNKNOWN_ERROR', error.code, error.errors);
  }

  return res.json();
}

async function parseError(res: Response) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}
