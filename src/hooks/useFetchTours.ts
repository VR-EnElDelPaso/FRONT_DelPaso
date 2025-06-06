import { useEffect, useState } from "react";
import { getAllTours } from "../services/tour.services";
import { Tour } from "@/types/tour";

const useFetchTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    getAllTours().then((response) => {
      setTours(response.data);
    });
  }, []);

  return tours;
};

export default useFetchTours;
