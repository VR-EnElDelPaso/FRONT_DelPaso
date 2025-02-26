import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "@/services/Tour";

const TOURS_QUERY_KEY = "tours";

// ----------- Queries -----------
export const useFetchTours = () => {
  return useQuery({
    queryKey: [TOURS_QUERY_KEY],
    queryFn: getAllTours
  })
}