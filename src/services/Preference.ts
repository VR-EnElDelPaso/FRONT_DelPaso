import axios from "axios"
import ResponseData from "../types/ResponseData"

const apiBaseUrl = "http://localhost:4006/api"

// create a new preference based on tour ids, return the id of the preference
export const createPreferences = async (tourIds: string[]): Promise<ResponseData> => {
  const response = await axios.post(`${apiBaseUrl}/preference/multi`, {
    item_ids: tourIds
  })
  return response.data
}

export const createPreference = async (tourId: string): Promise<ResponseData> => {
  const response = await axios.post(`${apiBaseUrl}/preference/${tourId}`)
  return response.data
}