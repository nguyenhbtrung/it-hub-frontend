import { auth } from '@/auth';
import { API_BASE_URL } from './constants';
import { ApiRequestOptions, ApiResponse } from './types';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

interface AuthConfig {
  sessionProvider?: () => Promise<Session | null> | Session | null;
  tokenHeader?: string;
  tokenPrefix?: string;
}

export class ApiClient {
  private authConfig: AuthConfig;

  constructor(authConfig: AuthConfig = {}) {
    this.authConfig = {
      tokenHeader: 'Authorization',
      tokenPrefix: 'Bearer',
      ...authConfig,
    };
  }

  private async request<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    const { auth: needAuth = true, retry = true, headers, query, signal, ...rest } = options;

    try {
      let session = null;
      if (this.authConfig.sessionProvider && needAuth) {
        session = await this.authConfig.sessionProvider();
      }

      const url = this.buildUrl(endpoint) + this.buildQueryString(query);

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

      if (res.status === 401) {
        if (needAuth && retry) {
          return this.request<T>(endpoint, {
            ...options,
            retry: false,
          });
        }
        return {
          success: false,
          code: 'UNAUTHORIZED',
          message: 'Người dùng chưa đăng nhập',
          errors: [],
          meta: {},
        };
      }

      const json = await this.parseResponse(res);

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

  private buildUrl(endpoint: string): string {
    // Handle both absolute and relative URLs
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  }

  private buildQueryString(query?: Record<string, any>) {
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

  private async parseResponse(res: Response) {
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

  async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

const getClientToken = (): Promise<Session | null> | Session | null => {
  if (typeof window === 'undefined') return null;
  return getSession();
};

const getServerToken = (): Promise<Session | null> | Session | null => {
  return auth();
};

export const clientApi = new ApiClient({
  sessionProvider: getClientToken,
});

export const serverApi = new ApiClient({
  sessionProvider: getServerToken,
});

export const api = typeof window === 'undefined' ? serverApi : clientApi;
