export interface ApiFetchOptions extends RequestInit {
  auth?: boolean;
  retry?: boolean;
  query?: Record<string, any>;
  signal?: AbortSignal;
}
