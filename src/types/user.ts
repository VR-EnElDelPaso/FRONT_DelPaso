// src/types/user.ts
export default interface User {
  id: string;
  account_number?: number;
  name: string;
  first_lastname: string;
  second_lastname: string;
  display_name: string;
  email: string;
  image?: string;
  role: UserType;
  is_verified?: boolean; // Agregar campo is_verified
  created_at: string;
  updated_at: string;
  iat: number;
  exp: number;
}

export interface RegisterUser {
  account_number?: number;
  name: string;
  first_lastname: string;
  second_lastname: string;
  display_name: string;
  email: string;
  password: string;
  role: UserType;
}

export enum UserType {
  ADMIN = "ADMIN",
  VISITOR = "VISITOR",
  STUDENT = "STUDENT",
  WORKER = "WORKER",
}

// Interfaces para Request y Response
export interface CreateUserRequest {
  account_number?: number;
  name: string;
  first_lastname: string;
  second_lastname: string;
  display_name: string;
  email: string;
  password: string;
  role: UserType;
}

export interface CreateUserResponse {
  id: string;
  account_number?: number;
  name: string;
  first_lastname: string;
  second_lastname: string;
  display_name: string;
  email: string;
  role: UserType;
  is_verified?: boolean;
  created_at: string;
  updated_at: string;
}

// Export tanto como default como named export para compatibilidad
export type { User };
