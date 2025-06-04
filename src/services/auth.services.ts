import axios from "axios";
import User, { RegisterUser } from "@/types/user"; // Corregido el import

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

const headers = {
  "Content-Type": "application/json",
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("auth-token");
  return {
    ...headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Login with email and password
export const LocalLogin = async (email: string, password: string) =>
  axios.post(
    `${apiBaseUrl}/auth/login/local`,
    {
      email,
      password,
    },
    { headers }
  );

// Register a new user
export const Register = async (user: RegisterUser) =>
  axios.post(`${apiBaseUrl}/users/new`, user, { headers });

export const sendVerificationEmail = async (email: string) =>
  axios.post(
    `${apiBaseUrl}/users/send-verification-email`,
    { email },
    { headers }
  );

export const verifyEmail = async (token: string) =>
  axios.post(`${apiBaseUrl}/users/email-verify`, { token }, { headers });

// Update user profile
export const UpdateUserProfile = async (userData: Partial<User>) =>
  axios.put(`${apiBaseUrl}/users/update`, userData, {
    headers: getAuthHeaders(),
  });

// Get user profile
export const GetUserProfile = async () =>
  axios.get(`${apiBaseUrl}/users/profile`, { headers: getAuthHeaders() });

// Validate token
export const ValidateToken = async (token: string) =>
  axios.post(`${apiBaseUrl}/auth/validate`, { token }, { headers });
