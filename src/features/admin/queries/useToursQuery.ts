import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTour, getAllTours } from "@/services/Tour";
import { Tour } from "@/types/tour";
import { Tag } from "@/types/tag";

const TOURS_QUERY_KEY = "tours";

// ----------- Queries -----------
export const useFetchTours = () => {
  return useQuery({
    queryKey: [TOURS_QUERY_KEY],
    queryFn: getAllTours
  })
}

// ----------- Mutations -----------
export const useCreateTour = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tour: Partial<Tour> & { tags: Array<Tag | string> }) => createTour(tour),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TOURS_QUERY_KEY]});
    }
  })
}