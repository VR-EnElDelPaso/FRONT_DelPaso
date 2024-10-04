import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const createPreference = async (tourId: string) => {
  return await axios.post(`${API_BASE_URL}/preference/${tourId}`);
}