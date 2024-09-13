import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getTours = async () => {
  return await axios.get(`${API_BASE_URL}/tour`);
}