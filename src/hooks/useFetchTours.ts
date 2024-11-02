import { useEffect, useState } from "react";

import { getAllTours } from '../services/Tour';

const useFetchTours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    getAllTours().then((tours) => {
      console.log(tours);
      setTours(tours);
    })
  }, []);

  return tours;
}


export default useFetchTours;