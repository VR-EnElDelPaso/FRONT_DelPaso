// src/services/user-profile.services.ts
import axios from "axios";
import User from "@/types/user";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

interface UserProfileResponse {
  ok: boolean;
  message: string;
  data: User;
}

interface UpdateUserProfileData {
  name: string;
  first_lastname: string;
  second_lastname: string;
  display_name: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("auth-token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Get user profile
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  try {
    const response = await axios.get<UserProfileResponse>(
      `${apiBaseUrl}/users/profile`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Error al obtener el perfil de usuario"
      );
    }
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (
  userData: Partial<UpdateUserProfileData>
): Promise<UserProfileResponse> => {
  try {
    const response = await axios.put<UserProfileResponse>(
      `${apiBaseUrl}/users/update`,
      userData,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Error al actualizar el perfil"
      );
    }
    throw error;
  }
};
