import { useEffect, useState } from "react";

import { getTours } from '../apis/Tours';

const useFetchTours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    getTours().then((tours) => {
      setTours(tours.data);
    })
  }, []);

  return tours;
}

export default useFetchTours;