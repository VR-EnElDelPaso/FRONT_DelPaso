import axios from "axios";
import { Accreditation } from "@/features/accreditations/accreditations.types";
import { ResponseDataTyped } from "@/shared/types/response-data.types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/accreditations";

export const getAuthConfig = () => {
  const token = localStorage.getItem("auth-token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllAccreditations = async () => {
  const response = await axios.get<ResponseDataTyped<Accreditation[]>>(
    `${BASE_URL}/`
  );
  return response.data;
};
