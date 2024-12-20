import type { UserRole } from './auth';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isAdmin: boolean;
  createdAt: string;
}

export interface UserFormData {
  email: string;
  name: string;
  role: UserRole;
}