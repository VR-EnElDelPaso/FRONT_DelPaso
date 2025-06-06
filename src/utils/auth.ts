//src\utils\auth.ts
import User, { UserType } from "@/types/user";
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string): User => {
  return jwtDecode<User>(token);
};

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

/**
 * Function to get the full name of a user
 * @param user => User object
 * @returns Full name string
 */
export const getFullName = (user: User): string => {
  if (!user) return "";
  return `${user.name} ${user.first_lastname} ${user.second_lastname}`.trim();
};

/**
 * Function to get user initials from name and first lastname
 * @param user => User object
 * @returns User initials (e.g., "MR" for Miguel Rosado)
 */
export const getUserInitials = (user: User): string => {
  if (!user) return "";

  const nameParts = user.name.split(" ");
  const firstNameInitial = nameParts[0]?.charAt(0) || "";
  const firstLastnameInitial = user.first_lastname?.charAt(0) || "";

  return `${firstNameInitial}${firstLastnameInitial}`.toUpperCase();
};

/**
 * Function to format user display name for UI
 * @param user => User object
 * @returns Formatted display name
 */
export const getDisplayName = (user: User): string => {
  return user?.display_name || user?.name || "";
};

/**
 * Function to validate if user has complete name information
 * @param user => User object
 * @returns boolean indicating if user has complete name info
 */
export const hasCompleteNameInfo = (user: User): boolean => {
  return !!(user?.name && user?.first_lastname && user?.second_lastname);
};

/**
 * Function to format user name for formal contexts
 * @param user => User object
 * @returns Formal name format (e.g., "Rosado González, Miguel")
 */
export const getFormalName = (user: User): string => {
  if (!user || !hasCompleteNameInfo(user)) return getDisplayName(user);

  return `${user.first_lastname} ${user.second_lastname}, ${user.name}`;
};
