import User, { UserType } from "@/types/user";
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string): User => {
  return jwtDecode<User>(token);
}

/**
 * Function to get the redirect path based on the user role after login
 * @param token => JWT token
 * @param defaultPath => Default path to redirect to
 * @returns 
 */
export const getRedirectPath = (token: string, defaultPath: string): string => {
  const { role } = decodeToken(token);
  return role === UserType.ADMIN ? "/admin" : defaultPath;
};