import { Museum, MuseumHours } from "@/types/Museums";
import ResponseData from "@/shared/types/response-data.types";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// API Interfaces
interface ApiOpenHour {
  day: string;
  is_open: boolean;
  open_time: string | null;
  close_time: string | null;
  museum_id: string;
}

interface ApiHourFormat {
  day: string;
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
}

interface ApiMuseum extends Omit<Museum, "hours"> {
  open_hours?: ApiOpenHour[];
  hours?: MuseumHours[];
}

interface MuseumsResponse {
  ok: boolean;
  message: string;
  data: ApiMuseum[];
}

/**
 * Transforms API hours format to frontend format
 */
const transformHoursFromApi = (apiHours: ApiOpenHour[]): MuseumHours[] => {
  if (!apiHours || !Array.isArray(apiHours)) return [];

  return apiHours.map((hour) => ({
    day: hour.day,
    isOpen: hour.is_open,
    openTime: hour.open_time || undefined,
    closeTime: hour.close_time || undefined,
  }));
};

/**
 * Transforms frontend hours format to API format
 */
const transformHoursToApi = (hours: MuseumHours[]): ApiHourFormat[] => {
  if (!hours || !Array.isArray(hours)) return [];

  return hours.map((hour) => ({
    day: hour.day,
    isOpen: hour.isOpen,
    // For open days, set times appropriately
    // For closed days, explicitly set to null
    openTime: hour.isOpen ? hour.openTime || "00:00" : null,
    closeTime: hour.isOpen ? hour.closeTime || "23:59" : null,
  }));
};

/**
 * Processes museum data from API to frontend format
 */
const processMuseumFromApi = (apiMuseum: ApiMuseum): Museum => {
  let hours: MuseumHours[] = [];

  // Process hours from either format the API might return
  if (apiMuseum.hours && Array.isArray(apiMuseum.hours)) {
    hours = apiMuseum.hours;
  } else if (apiMuseum.open_hours && Array.isArray(apiMuseum.open_hours)) {
    hours = transformHoursFromApi(apiMuseum.open_hours);
  }

  // Create a new object without open_hours
  const museum = {
    ...apiMuseum,
    hours,
  } as Museum;

  // Use a temporary object to remove open_hours
  const tempObj = { ...museum } as unknown as {
    [key: string]: unknown;
  };
  delete tempObj.open_hours;

  return tempObj as unknown as Museum;
};

/**
 * Prepares museum data for API submission
 */
const prepareMuseumForApi = (museum: Museum): Record<string, unknown> => {
  // Create a simple object for the API
  const apiData: Record<string, unknown> = { ...museum };

  // Always include hours in the expected format
  if (museum.hours && Array.isArray(museum.hours)) {
    apiData.hours = transformHoursToApi(museum.hours);
  } else {
    // If no hours provided, send an empty array
    apiData.hours = [];
  }

  return apiData;
};

/**
 * Gets all museums
 */
export const getAllMuseums = async (): Promise<MuseumsResponse> => {
  try {
    const response = await axios.get<MuseumsResponse>(`${apiBaseUrl}/museums`);

    if (response.data && response.data.data) {
      // Process each museum to ensure consistent format
      const transformedData = response.data.data.map(processMuseumFromApi);
      response.data.data = transformedData as unknown as ApiMuseum[];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching museums:", error);
    throw error;
  }
};

/**
 * Creates a new museum
 */
export const createMuseum = async (museum: Museum): Promise<Museum> => {
  try {
    console.log("Creating museum with data:", museum);

    // Prepare data in format expected by API
    const apiData = prepareMuseumForApi(museum);
    console.log("Prepared data for API:", apiData);

    const response = await axios.post(`${apiBaseUrl}/museums`, apiData);

    if (response.data && response.data.data) {
      // Process response to ensure consistent format
      const processedMuseum = processMuseumFromApi(response.data.data);

      // If hours were submitted but not in the response, add them
      if (
        (!processedMuseum.hours || processedMuseum.hours.length === 0) &&
        museum.hours &&
        museum.hours.length > 0
      ) {
        processedMuseum.hours = museum.hours;
      }

      return processedMuseum;
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    }
    throw error;
  }
};

/**
 * Edits an existing museum
 */
export const editMuseum = async (
  id: string,
  museum: Museum
): Promise<Museum> => {
  try {
    console.log("Editing museum with data:", museum);

    // Prepare data in format expected by API
    const apiData = prepareMuseumForApi(museum);
    console.log("Prepared data for API:", apiData);

    const response = await axios.patch(`${apiBaseUrl}/museums/${id}`, apiData);

    if (response.data && response.data.data) {
      // Process response to ensure consistent format
      const processedMuseum = processMuseumFromApi(response.data.data);

      // If hours were submitted but not in the response, add them
      if (
        (!processedMuseum.hours || processedMuseum.hours.length === 0) &&
        museum.hours &&
        museum.hours.length > 0
      ) {
        processedMuseum.hours = museum.hours;
      }

      return processedMuseum;
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    }
    throw error;
  }
};

/**
 * Deletes a museum
 */
export const deleteMuseum = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/museums/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting museum:", error);
    throw error;
  }
};

/**
 * Gets the tours of a museum
 */
export const getMuseumTours = async (
  museumId: string
): Promise<ResponseData> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/museums/${museumId}/tours`);
    return response.data;
  } catch (error) {
    console.error("Error fetching museum tours:", error);
    throw error;
  }
};

/**
 * Gets a museum by ID
 */
export const getMuseumById = async (id: string): Promise<Museum> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/museums/${id}`);

    if (response.data && response.data.data) {
      // Process museum to ensure consistent format
      return processMuseumFromApi(response.data.data);
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching museum by ID:", error);
    throw error;
  }
};
