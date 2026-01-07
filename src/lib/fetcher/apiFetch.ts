import { auth } from '@/auth';
import { API_BASE_URL } from './constants';
import { ApiFetchOptions } from './types';
import { ApiError } from '../errors/ApiError';

export async function apiFetch<T>(endpoint: string, options: ApiFetchOptions = {}): Promise<T> {
  const { auth: needAuth = true, retry = true, headers, query, signal, ...rest } = options;

  const session = needAuth ? await auth() : null;
  const accessToken = session?.accessToken;

  const queryString = buildQueryString(query);
  const url = `${API_BASE_URL}${endpoint}${queryString}`;

  const res = await fetch(url, {
    ...rest,
    signal,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      Cookie: `refreshToken=${session?.refreshToken || ''}`,
      ...(headers || {}),
      ...(!(rest.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
    },
    credentials: 'include',
    cache: 'no-store',
  });

  // ===== Access token hết hạn =====
  if (res.status === 401 && needAuth && retry) {
    // const refreshed = await refreshAccessToken();

    // if (!refreshed) {
    //   const error = await parseError(res);
    //   throw new ApiError(res.status, 'UNAUTHORIZED', error.code);
    // }

    // Retry request
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

function buildQueryString(query?: ApiFetchOptions['query']) {
  if (!query) return '';

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null) {
          params.append(key, String(v));
        }
      });
    } else {
      params.append(key, String(value));
    }
  });

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

async function parseError(res: Response) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}
