import axios from "axios";
import { Carousel, CarouselFormData } from "@/shared/types/Carousel";
import ResponseData, {
  ResponseDataTyped,
} from "@/shared/types/response-data.types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Valor de paginación por defecto
const defaultPagination = {
  total: 0,
  page: 1,
  limit: 10,
  hasMore: false,
};

// Obtener todos los carruseles
export const getCarousels = async (): Promise<
  ResponseDataTyped<Carousel[]>
> => {
  try {
    const response = await axios.get<ResponseDataTyped<Carousel[]>>(
      `${apiBaseUrl}/carousels`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting carousels:", error);
    return {
      ok: false,
      message: "Error al obtener los carruseles",
      data: [],
      pagination: defaultPagination,
    };
  }
};

// Obtener un carrusel específico por ID
export const getCarouselById = async (
  id: string
): Promise<ResponseDataTyped<Carousel>> => {
  try {
    const response = await axios.get<ResponseDataTyped<Carousel>>(
      `${apiBaseUrl}/carousels/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error getting carousel with id ${id}:`, error);
    return {
      ok: false,
      message: "Error al obtener el carrusel",
      data: {} as Carousel,
      pagination: defaultPagination,
    };
  }
};

// Crear un nuevo carrusel
export const createCarousel = async (
  data: CarouselFormData
): Promise<ResponseData> => {
  try {
    const response = await axios.post<ResponseData>(
      `${apiBaseUrl}/carousels`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating carousel:", error);
    return {
      ok: false,
      message: "Error al crear el carrusel",
      pagination: defaultPagination,
    };
  }
};

// Actualizar un carrusel
export const updateCarousel = async (
  id: string,
  data: CarouselFormData
): Promise<ResponseData> => {
  try {
    const response = await axios.put<ResponseData>(
      `${apiBaseUrl}/carousels/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating carousel with id ${id}:`, error);
    return {
      ok: false,
      message: "Error al actualizar el carrusel",
      pagination: defaultPagination,
    };
  }
};

// Obtener la landing page
export const getLandingPage = async (): Promise<ResponseData> => {
  try {
    const response = await axios.get<ResponseData>(
      `${apiBaseUrl}/pages/landing`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting landing page:", error);
    return {
      ok: false,
      message: "Error al obtener la página de landing",
      pagination: defaultPagination,
    };
  }
};

// Obtener el carrusel principal de la landing
export const getMainCarousel = async (): Promise<
  ResponseDataTyped<Carousel>
> => {
  try {
    // Primero obtenemos todos los carruseles
    const response = await getCarousels();

    if (!response.ok || !response.data || response.data.length === 0) {
      return {
        ok: false,
        message: "No se encontró el carrusel principal",
        data: {} as Carousel,
        pagination: defaultPagination,
      };
    }

    // Si hay carruseles, tomamos el primero (que asumimos es el principal)
    return {
      ok: true,
      message: "Carrusel obtenido correctamente",
      data: response.data[0],
      pagination: defaultPagination,
    };
  } catch (error) {
    console.error("Error getting main carousel:", error);
    return {
      ok: false,
      message: "Error al obtener el carrusel principal",
      data: {} as Carousel,
      pagination: defaultPagination,
    };
  }
};
