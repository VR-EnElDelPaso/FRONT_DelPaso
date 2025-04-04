import { getAllFaqs } from "@/services/Faqs";
import { useQuery } from "@tanstack/react-query";

const FAQS_QUERY_KEY = "faqs";

// ----------- Queries -----------
export const useFetchFaqs = () => {
  return useQuery({
    queryKey: [FAQS_QUERY_KEY],
    queryFn: getAllFaqs
  });
};