// types/enrollment.ts
export interface Student {
  id: string;
  email: string;
  fullname: string;
  avatar: string | null;
  progressPercent: number;
  enrolledAt: string;
}

export interface Registration {
  id: string;
  email: string;
  fullname: string;
  avatar: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    timestamp: string;
  };
}
