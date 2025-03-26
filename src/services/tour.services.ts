import axios from "axios";
import ResponseData, { ResponseDataTyped } from "../shared/types/response-data.types";
import { Tag } from "@/types/tag";
import { CheckedTourSuccessResponse } from "@/features/tour/types/tour.types";
import { Tour } from "@/shared/types/Tour";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

interface ToursResponse {
  ok: boolean;
  message: string;
  data: Tour[];
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("auth-token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
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
      headers: getAuthHeaders(),
    }
  );
  return response.data;
}

// Verificar múltiples tours comprados
export const checkPurchasedTours = async (tourIds: string[]): Promise<ResponseDataTyped<string[]>> => {
  try {
    // Si no hay token o no hay tours para verificar, retornamos un array vacío
    const token = localStorage.getItem("auth-token");
    if (!token || tourIds.length === 0) {
      return {
        ok: true,
        message: "No hay tours para verificar",
        data: [],
        pagination: { total: 0, page: 1, limit: 10, hasMore: false }
      };
    }

    // Verificar cada tour individualmente y recopilar los IDs de los comprados activos
    const purchaseChecks = await Promise.all(
      tourIds.map(async (id) => {
        try {
          const response = await checkPurchasedTour(id);
          // Solo consideramos comprado si purchased es true (si está activo)
          return response.data?.purchased ? id : null;
        } catch (error) {
          console.error(`Error verificando compra del tour ${id}:`, error);
          return null;
        }
      })
    );

    // Filtrar solo los IDs de tours que tienen compras activas (no nulos)
    const activePurchasedTourIds = purchaseChecks.filter(id => id !== null) as string[];

    return {
      ok: true,
      message: "Verificación de compras completada",
      data: activePurchasedTourIds,
      pagination: { total: activePurchasedTourIds.length, page: 1, limit: 10, hasMore: false }
    };
  } catch (error) {
    console.error("Error al verificar tours comprados:", error);
    return {
      ok: false,
      message: "Error al verificar tours comprados",
      data: [],
      pagination: { total: 0, page: 1, limit: 10, hasMore: false }
    };
  }
}

export const getTourUrl = async (tourId: string): Promise<ResponseDataTyped<{ tour_url: string }>> => {
  const response = await axios.get<ResponseDataTyped<{ tour_url: string }>>(
    `${apiBaseUrl}/tours/${tourId}/url`,
    { headers: getAuthHeaders() }
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
    { headers: getAuthHeaders() }
  );

  return response.data;
};

//get tour by id
export const getTourById = async (id: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/tours/${id}`, { 
      headers: getAuthHeaders() 
    });
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
    `${apiBaseUrl}/tours/suggestion?take=${quantity}`,
    {
      excludedIds: excludedTourIds,
      quantity,
    },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

// Refactorized createTour function with proper type handling
export const createTour = async (
  tour: Partial<Tour> & { tags: Array<Tag | string> }
): Promise<Tour> => {
  try {
    // Process tags to match API expectations
    const dataToSend = {
      ...tour,
      // Extract tag IDs for API
      tags: tour.tags.map((tag) => (typeof tag === "object" ? tag.id : tag)),
    };

    const response = await axios.post(
      `${apiBaseUrl}/tours`, 
      dataToSend,
      { headers: getAuthHeaders() }
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al crear el tour"
      );
    }
    throw error;
  }
};

// Refactorized editTour function with proper type handling
export const editTour = async (
  id: string,
  tour: Partial<Tour> & { tags?: Tag[] }
): Promise<Tour> => {
  try {
    // Process tags to match API expectations
    const dataToSend = {
      ...tour,
      // Extract tag IDs for API
      tags: tour.tags?.map(tag => tag.id)
    };

    const response = await axios.patch(
      `${apiBaseUrl}/tours/${id}`, 
      dataToSend, 
      { headers: getAuthHeaders() }
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al actualizar el tour"
      );
    }
    throw error;
  }
};

//delete reviews by tour id
const deleteReviewsByTourId = async (tourId: string): Promise<void> => {
  try {
    const headers = getAuthHeaders();

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
    const headers = getAuthHeaders();

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