import { EnrollmentStatus } from '@/types/enrollment';

export interface CreateEnrollmentPayload {
  status: EnrollmentStatus;
}

export interface UpdateEnrollmentPayload {
  status: EnrollmentStatus;
}

export interface CreateEnrollmentQuery {
  userId?: string;
}

export interface DeleteEnrollmentQuery {
  userId?: string;
}
