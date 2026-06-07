import { auth } from '@/auth';
import { API_BASE_URL } from './constants';
import { ApiRequestOptions, ApiResponse } from './types';

export class ApiClient {
  static async request<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    const { auth: needAuth = true, retry = true, headers, query, signal, ...rest } = options;

    try {
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

      const json = await parseResponse(res);

      if (res.status === 401 && needAuth && retry) {
        return ApiClient.request<T>(endpoint, {
          ...options,
          retry: false,
        });
      }

      return json;
    } catch {
      return {
        success: false,
        code: 'NETWORK_ERROR',
        message: 'Không thể kết nối máy chủ',
        errors: [],
        meta: {},
      };
    }
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

async function parseResponse(res: Response) {
  try {
    return await res.json();
  } catch {
    return {
      success: false,
      code: 'INVALID_RESPONSE',
      message: 'Phản hồi không hợp lệ',
      errors: [],
      meta: {},
    };
  }
}
