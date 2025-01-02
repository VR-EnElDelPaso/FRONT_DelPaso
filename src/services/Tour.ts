import axios from "axios";
import ResponseData from "../types/ResponseData";
import { Tour } from "@/types/tour";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

interface ToursResponse {
  ok: boolean;
  message: string;
  data: Tour[];
}

const headers = {
  "Content-Type": "application/json",
};

//get all tours
export const getAllTours = async (): Promise<ToursResponse> => {
  const response = await axios.get<ToursResponse>(`${apiBaseUrl}/tour`);
  return response.data;
};

//get tours
export const getTours = async (tourIds: string[]): Promise<ResponseData> => {
  const response = await axios.post(
    `${apiBaseUrl}/tour/from-array`,
    {
      ids: tourIds,
    },
    { headers }
  );

  return response.data;
};

//get tour by id
export const getTourById = async (id: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/tour/${id}`, { headers });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tour", error);
    return null;
  }
};

// todo: get tour suggestions to use en tour suggestions component
export const getTourSuggestions = async (
  excludedTourIds: string[],
  quantity: number
): Promise<ResponseData> => {
  const response = await axios.post(
    `${apiBaseUrl}/tour/suggestion?take=${quantity}`,
    {
      excludedIds: excludedTourIds,
      quantity,
    },
    { headers }
  );
  return response.data;
};

//create tour
export const createTour = async (tour: Partial<Tour>): Promise<Tour> => {
  const response = await axios.post(`${apiBaseUrl}/tour`, tour);
  return response.data;
};

//edit tour
export const editTour = async (
  id: string,
  tour: Partial<Tour>
): Promise<Tour> => {
  const response = await axios.patch(`${apiBaseUrl}/tour/${id}`, tour);
  return response.data;
};

//delete reviews by tour id
const deleteReviewsByTourId = async (tourId: string): Promise<void> => {
  try {
    const token = localStorage.getItem("auth-token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.get(`${apiBaseUrl}/reviews/${tourId}/reviews`);
    const reviews = response.data.data.reviews;

    // Eliminar cada review individualmente con el token
    await Promise.all(
      reviews.map((review: { id: string }) =>
        axios.delete(`${apiBaseUrl}/reviews/${review.id}`, { headers })
      )
    );
  } catch (error) {
    console.error("Error deleting reviews:", error);
    throw error;
  }
};

//delete tour
export const deleteTour = async (id: string): Promise<ResponseData> => {
  try {
    const token = localStorage.getItem("auth-token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Primero eliminamos las reviews asociadas
    await deleteReviewsByTourId(id);

    // Luego eliminamos el tour
    const response = await axios.delete(`${apiBaseUrl}/tour/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al eliminar el tour"
      );
    }
    throw error;
  }
};
