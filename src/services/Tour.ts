import axios from "axios";
import ResponseData from "../types/ResponseData";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string

const headers = {
  'Content-Type': 'application/json',
}

//get all tours
export const getAllTours = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/tour`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching tours', error);
    return [];
  }
};

//get tours
export const getTours = async (tourIds: string[]): Promise<ResponseData> => {
  const response = await axios.post(`${apiBaseUrl}/tour/from-array`, {
    ids: tourIds
  }, { headers });
  
  return response.data;
}

//get tour by id
export const getTourById = async (id: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/tour/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching tour', error);
    return null;
  }
}