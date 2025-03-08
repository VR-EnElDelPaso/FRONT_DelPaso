import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkPurchasedTour, createTour, getAllTours } from "@/services/tour.services";
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

export const useCheckPurchasedTour = (tourId: string) => {
  return useQuery({
    queryKey: [TOURS_QUERY_KEY, tourId],
    queryFn: () => checkPurchasedTour(tourId)
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