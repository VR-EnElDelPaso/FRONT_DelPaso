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

export const createMuseum = async (museum: Museum): Promise<Museum> => {
  const response = await axios.post(`${apiBaseUrl}/museums`, museum);
  return response.data;
}