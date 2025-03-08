import { Museum } from "@/types/Museums";
import ResponseData from "@/shared/types/response-data.types";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface MuseumsResponse {
  ok: boolean;
  message: string;
  data: Museum[];
}


// ----[ Crud operations ]----
export const getAllMuseums = async (): Promise<MuseumsResponse> => {
  const response = await axios.get<MuseumsResponse>(`${apiBaseUrl}/museums`);
  return response.data;
};

export const createMuseum = async (museum: Museum): Promise<Museum> => {
  const response = await axios.post(`${apiBaseUrl}/museums`, museum);
  return response.data;
}

export const editMuseum = async (id: string, museum: Museum): Promise<Museum> => {
  const response = await axios.patch(`${apiBaseUrl}/museums/${id}`, museum);
  return response.data;
}

export const deleteMuseum = async (id: string): Promise<void> => {
  const response = await axios.delete(`${apiBaseUrl}/museums/${id}`);
  return response.data;
}

// ----[ Sub resources ]----
export const getMuseumTours = async (museumId: string): Promise<ResponseData> => {
  const response = await axios.get(`${apiBaseUrl}/museums/${museumId}/tours`);
  return response.data;
}

export const getMuseumById = async (id: string): Promise<Museum> => {
  const response = (await axios.get(`${apiBaseUrl}/museums/${id}`)).data;
  return response.data;
}