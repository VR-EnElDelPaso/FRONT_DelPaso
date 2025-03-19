import axios from "axios";
import ResponseData, { ResponseDataTyped } from "../shared/types/response-data.types";
import { Tag } from "@/types/tag";
import { CheckedTourSuccessResponse } from "@/features/tour/types/tour.types";
import { getAuthConfig } from './preference.services';
import { Tour } from "@/shared/types/Tour";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

interface ToursResponse {
  ok: boolean;
  message: string;
  data: Tour[];
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
};

//get all tours
export const getAllTours = async (): Promise<ToursResponse> => {
  const response = await axios.get<ToursResponse>(`${apiBaseUrl}/tours`);
  return response.data;
};

export const checkPurchasedTour = async (tourId: string): Promise<ResponseDataTyped<CheckedTourSuccessResponse>> => {
  const response = await axios.get<ResponseDataTyped<CheckedTourSuccessResponse>>(
    `${apiBaseUrl}/tours/${tourId}/check-purchase`,
    {
      headers,
      ...getAuthConfig().headers
    }
  );
  console.log(response.data);
  return response.data;
}

export const getTourUrl = async (tourId: string): Promise<ResponseDataTyped<{ tour_url: string }>> => {
  const response = await axios.get<ResponseDataTyped<{ tour_url: string }>>(
    `${apiBaseUrl}/tours/${tourId}/url`,
    { headers }
  );
  return response.data;
}

//get tours
export const getTours = async (tourIds: string[]): Promise<ResponseData> => {
  const response = await axios.post(
    `${apiBaseUrl}/tours/from-array`,
    {
      ids: tourIds,
    },
    { headers }
  );

  return response.data;
};

//get tour by id
export const getTourById = async (id: string): Promise<ResponseDataTyped<Tour>> => {
  const response = await axios.get(`${apiBaseUrl}/tours/${id}`, { headers });
  return response.data;
};

// todo: get tour suggestions to use en tour suggestions component
export const getTourSuggestions = async (
  excludedTourIds: string[],
  quantity: number
): Promise<ResponseData> => {
  const response = await axios.post(
    `${apiBaseUrl}/tours/suggestion?take=${quantity}`,
    {
      excludedIds: excludedTourIds,
      quantity,
    },
    { headers }
  );
  return response.data;
};

//create tour
export const createTour = async (
  tour: Partial<Tour> & { tags: Array<Tag | string> }
): Promise<Tour> => {
  const dataToSend = {
    ...tour,
    // Si el tag es un objeto, tomamos su id, si es un string lo dejamos como está
    tags: tour.tags.map((tag) => (typeof tag === "object" ? tag.id : tag)),
  };

  const response = await axios.post(`${apiBaseUrl}/tours`, dataToSend);
  return response.data;
};

//edit tour
export const editTour = async (
  id: string,
  tour: Partial<Tour>
): Promise<Tour> => {
  // Si hay tags, extraemos solo los IDs antes de enviar
  const dataToSend = {
    ...tour,
    tags: tour.tags?.map((tag) => tag.id), // Convertimos los tags a array de IDs
  };

  const response = await axios.patch(`${apiBaseUrl}/tours/${id}`, dataToSend);
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
    const response = await axios.delete(`${apiBaseUrl}/tours/${id}`, {
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
