import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkPurchasedTour, createTour, getAllTours, getTourById, getTourUrl } from "@/services/tour.services";
import { Tour } from "@/types/tour";
import { Tag } from "@/types/tag";

const TOURS_QUERY_KEY = "tours";

// ----------- Queries -----------
export const useFetchTours = () => {
  return useQuery({
    queryKey: [TOURS_QUERY_KEY, "all"],
    queryFn: getAllTours,
  })
}

export const useFetchTourById = (tourId: string, enabled = true) => {
  return useQuery({
    queryKey: [TOURS_QUERY_KEY, "by-id", tourId],
    queryFn: ({ queryKey }) => getTourById(queryKey[2]),
    enabled: !!tourId && enabled,
  })
}

export const useCheckPurchasedTour = (tourId: string, enabled = true) => {
  return useQuery({
    queryKey: [TOURS_QUERY_KEY, "check-purchase", tourId],
    queryFn: () => checkPurchasedTour(tourId),
    enabled: !!tourId && enabled,
  })
}

export const useFetchTourUrl = (tourId: string, enabled = true) => {
  return useQuery({
    queryKey: [TOURS_QUERY_KEY, "url", tourId],
    queryFn: () => getTourUrl(tourId),
    enabled: !!tourId && enabled,
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