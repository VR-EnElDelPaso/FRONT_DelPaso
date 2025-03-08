import { getAllMuseums } from "@/services/Museums";
import { useQuery } from "@tanstack/react-query";

const MUSEUMS_QUERY_KEY = "museums";

// ----------- Queries -----------
export const useFetchMuseums = () => {
  return useQuery({
    queryKey: [MUSEUMS_QUERY_KEY],
    queryFn: getAllMuseums
  })
}