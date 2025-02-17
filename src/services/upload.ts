import type ResponseData from "@/types/ResponseData";

export const uploadImage = async (file: string): Promise<ResponseData> => {
  const base64Response = await fetch(file);
  const blob = await base64Response.blob();

  const formData = new FormData();
  formData.append("image", blob);

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/storage/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
