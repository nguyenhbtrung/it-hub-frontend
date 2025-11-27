export type role = 'admin' | 'instructor' | 'student';

export interface jwtPayload {
  userId: string;
  name: string;
  role: role;
}
