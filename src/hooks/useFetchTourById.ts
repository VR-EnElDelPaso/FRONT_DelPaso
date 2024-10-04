import { useEffect, useState } from "react";

import { getTourById } from "../services/Tour";
import { Tour } from "../types/tour";

const useFetchTourById = (id: string) => {
  const [tour, setTour] = useState<Tour | null>(null);

  useEffect(() => {
    getTourById(id).then((tour) => {
      setTour(tour);
    })
  }, [id]);

  return tour;
}

export default useFetchTourById;