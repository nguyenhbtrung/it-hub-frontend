export interface Overview {
  title: string;
  totalStudents: number;
  submittedStudents: number;
  unscoredAttempts: number;
  scoredAttempts: number;
  averageScore: number;
}

export interface Submission {
  email: string;
  fullname: string;
  avatar: string | null;
  attemptId?: string;
  attemptCount: number;
  score?: number | null;
  createdAt?: string;
}
