import axios from 'axios';

const API_BASE_URL = 'http://localhost:4006/api';

export const createPreference = async (tourId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/preference/${tourId}`);
    return response;
    
  } catch (error) {
    console.error('Error creating preference:', error);
    throw error;
  }
};