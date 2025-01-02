import { useEffect, useState } from "react";

import { getAllTours } from "../services/Tour";

import { Tour } from "@/types/tour"; // Assuming you have a Tour type defined

const useFetchTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    getAllTours().then((response) => {
      console.log(response);
      setTours(response.data);
    });
  }, []);

  return tours;
};

export default useFetchTours;
