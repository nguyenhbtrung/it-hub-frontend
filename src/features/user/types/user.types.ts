import { UserRole, UserScope, UserStatus } from '@/types/user';

export interface GetUsersQuery {
  page?: number;
  limit?: number;
  q?: string | string[];
  sortBy?: string | string[];
  sortOrder?: string | string[];
}

export interface GetMyLearningCoursesQuery {
  page?: number;
  limit?: number;
  status?: string;
}

export interface CreateUserPayload {
  email: string;
  fullname?: string | null;
  password: string;
  role: UserRole;
  scope: UserScope;
}

export interface UpdateUserPayload {
  email?: string;
  fullname?: string | null;
  school?: string | null;
  specialized?: string | null;
  bio?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
  role?: UserRole;
  status?: UserStatus;
  scope?: UserScope;
  instructorApplicationAt?: string | null;
}

export interface UpdateMyProfilePayload {
  avatarId?: string | null;
  fullname?: string | null;
  school?: string | null;
  specialized?: string | null;
  bio?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
}

export interface CreateOrUpdateStepLearningProgressPayload {
  status: string;
}
