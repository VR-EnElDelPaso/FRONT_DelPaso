import axios from "axios";
import ResponseData from "../types/ResponseData";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const getAuthConfig = () => {
  const token = localStorage.getItem("auth-token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Create a new preference based on tour ids, return the id of the preference
export const createPreferences = async (
  tourIds: string[]
): Promise<ResponseData> => {
  const response = await axios.post(
    `${apiBaseUrl}/preference/multi`,
    { item_ids: tourIds },
    getAuthConfig()
  );
  return response.data;
};

export const createPreference = async (
  tourId: string
): Promise<ResponseData> => {
  const response = await axios.post(
    `${apiBaseUrl}/preference/${tourId}`,
    {},
    getAuthConfig()
  );
  return response.data;
};
