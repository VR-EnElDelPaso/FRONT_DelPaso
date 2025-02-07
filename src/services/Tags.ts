import axios from "axios";
import { Tag } from "@/types/tag";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;

export const getAllTags = async (): Promise<Tag[]> => {
  const response = await axios.get(`${apiBaseUrl}/tags`);
  return response.data.data;
};

export const createTag = async (name: string): Promise<Tag> => {
  const response = await axios.post(`${apiBaseUrl}/tags`, { name });
  return response.data.data;
};

export const updateTourTags = async (
  tourId: string,
  tagIds: string[]
): Promise<void> => {
  await axios.put(`${apiBaseUrl}/tours/${tourId}/tags`, { tagIds });
};
