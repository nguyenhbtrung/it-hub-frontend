export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  meta: Record<string, any>;
}

export interface ApiErrorResponse {
  success: false;
  code: string;
  message: string;
  errors?: any[];
  meta: Record<string, any>;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
  retry?: boolean;
  query?: Record<string, any>;
  signal?: AbortSignal;
}
