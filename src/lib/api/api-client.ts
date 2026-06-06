import { auth } from '@/auth';
import { ApiError } from '@/lib/errors/ApiError';
import { API_BASE_URL } from './constants';
import { ApiRequestOptions } from './types';

export class ApiClient {
  static async request<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    const { auth: needAuth = true, retry = true, headers, query, signal, ...rest } = options;

    const session = needAuth ? await auth() : null;

    const url = API_BASE_URL + endpoint + buildQueryString(query);

    const res = await fetch(url, {
      ...rest,
      signal,
      cache: 'no-store',
      credentials: 'include',
      headers: {
        ...(session?.accessToken && {
          Authorization: `Bearer ${session.accessToken}`,
        }),
        Cookie: `refreshToken=${session?.refreshToken ?? ''}`,
        ...(headers ?? {}),
        ...(!(rest.body instanceof FormData)
          ? {
              'Content-Type': 'application/json',
            }
          : {}),
      },
    });

    if (res.status === 401 && needAuth && retry) {
      return ApiClient.request<T>(endpoint, {
        ...options,
        retry: false,
      });
    }

    if (!res.ok) {
      const error = await parseError(res);

      throw new ApiError(res.status, error.message, error.code, error.errors);
    }

    return res.json();
  }
}

function buildQueryString(query?: Record<string, any>) {
  if (!query) return '';

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value == null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v != null) {
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
