import axios from "axios";
import ResponseData from "../types/ResponseData";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const ReviewService = {
  createReview: async (
    tourId: string,
    reviewData: { score: number; comment: string }
  ): Promise<ResponseData> => {
    const token = localStorage.getItem("auth-token");

    try {
      const response = await axios.post(
        `${API_URL}/reviews/${tourId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            "Error creating review. Please try again."
        );
      }
      throw error;
    }
  },

  getAllReviews: async (): Promise<ResponseData> => {
    try {
      const response = await axios.get(`${API_URL}/reviews`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            "Error fetching reviews. Please try again."
        );
      }
      throw error;
    }
  },
};
