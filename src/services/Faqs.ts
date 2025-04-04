import { Faq } from "@/types/Faq";
import ResponseData from "@/shared/types/response-data.types";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface FaqsResponse {
  ok: boolean;
  message: string;
  data: Faq[];
}

// ----[ CRUD operations ]----
export const getAllFaqs = async (): Promise<FaqsResponse> => {
  const response = await axios.get<FaqsResponse>(`${apiBaseUrl}/faqs`);
  return response.data;
};

export const getFaqById = async (id: string): Promise<ResponseData> => {
  const response = await axios.get(`${apiBaseUrl}/faqs/${id}`);
  return response.data;
};

export const createFaq = async (
  faq: Omit<Faq, "id" | "created_at" | "updated_at">
): Promise<ResponseData> => {
  const response = await axios.post(`${apiBaseUrl}/faqs`, faq);
  return response.data;
};

export const updateFaq = async (
  id: string,
  faq: Partial<Faq>
): Promise<ResponseData> => {
  const response = await axios.patch(`${apiBaseUrl}/faqs/${id}`, faq);
  return response.data;
};

export const deleteFaq = async (id: string): Promise<ResponseData> => {
  const response = await axios.delete(`${apiBaseUrl}/faqs/${id}`);
  return response.data;
};
