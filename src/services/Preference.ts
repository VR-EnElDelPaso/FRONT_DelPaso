import axios from "axios";
import ResponseData from "../types/ResponseData";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getAuthConfig = () => {
  const token = localStorage.getItem("auth-token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

interface PostPreferenceResponse {
  id: string;
  init_point: string;
  external_reference: string;
}

export const createOnePreference = async (order_id: string) => {
  const response = await axios.post<ResponseData<PostPreferenceResponse>>(
    `${apiBaseUrl}/preferences`,
    {order_id},
    getAuthConfig()
  );
  return response.data;
};
