export default interface User {
  id: string;
  account_number: number;
  name: string;
  display_name: string;
  email: string;
  role: UserType;
  created_at: string;
  updated_at: string;
  iat: number;
  exp: number;
}

export interface RegisterUser {
  account_number: number;
  name: string;
  display_name: string;
  email: string;
  password: string;
  role: UserType;
}

export enum UserType {
  ADMIN = 'ADMIN',
  VISITOR = 'VISITOR',
  STUDENT = 'STUDENT',
  WORKER = 'WORKER',
}

