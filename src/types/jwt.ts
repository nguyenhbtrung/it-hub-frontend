import { UserRole } from './user';

export type role = UserRole;

export interface jwtPayload {
  userId: string;
  name: string;
  role: role;
}
