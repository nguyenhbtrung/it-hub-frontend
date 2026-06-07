export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface AuthUser {
  id?: string;
  email?: string;
  fullname?: string | null;
  role?: string;
  [key: string]: unknown;
}

export interface SignInResponseData {
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
  [key: string]: unknown;
}
