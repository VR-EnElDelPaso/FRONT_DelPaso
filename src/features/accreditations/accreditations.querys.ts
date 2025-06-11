import { useQuery } from "@tanstack/react-query"
import { getAllAccreditations } from "./accreditations.services"

const TOURS_QUERY_KEY = "tours"

export const useGetAllAccreditations = () => {
  return useQuery({
    queryKey: [TOURS_QUERY_KEY, "LIST"],
    queryFn: getAllAccreditations,
  })
}