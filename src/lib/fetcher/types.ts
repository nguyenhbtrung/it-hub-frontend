export interface ApiFetchOptions extends RequestInit {
  auth?: boolean;
  retry?: boolean;
  query?: Record<string, string | number | boolean | undefined | null>;
}
