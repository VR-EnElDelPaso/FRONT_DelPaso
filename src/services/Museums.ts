import { Museum } from "@/types/Museums";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface MuseumsResponse {
  data: Museum[]
}

export const getAllMuseums = async (): Promise<MuseumsResponse> => {
  const response = await axios.get<MuseumsResponse>(`${apiBaseUrl}/museums`);
  return response.data;
};