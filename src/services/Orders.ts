import { ResponseDataTyped } from "@/types/ResponseData";
import axios from "axios";
import { getAuthConfig } from "./Preference";

export interface PostOrderResponse {
  id: string;
  total: number;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  canceled_at: string;
  tours: [
    {
      id: string;
    }
  ]
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const createOneOrder = async (tourIds: string[]) => {
  const response = await axios.post<ResponseDataTyped<PostOrderResponse>>(
    `${BASE_URL}/orders/`,
    { tour_ids: tourIds },
    getAuthConfig());
  return response.data
}