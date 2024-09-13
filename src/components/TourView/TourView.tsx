import React, { useEffect, useState } from 'react';
import CardTour, { CardTourProps } from "./CardTour";
import { getTours } from '../../apis/Tours';
import { FadeInOnScroll } from "../animations/FadeInOnScroll";

interface TourViewProps {
    tourId: string;
}

const TourView: React.FC<TourViewProps> = ({ tourId }) => {
  const [tour, setTour] = useState<CardTourProps | null>(null);

  useEffect(() => {
    getTours().then((tours) => {
      const tour = tours.data.find((tour: CardTourProps) => tour.id === tourId);
      setTour(tour);
    })
  }, [tourId]);
  
  if (!tour) return <div>Cargando...</div>;
  return (
      <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-4 md:py-16 lg:py-20">
              <div className="max-w-7xl mx-auto">
                  <FadeInOnScroll distance={20} duration={2}>
                      <div className="mb-12 md:mb-16 lg:mb-20">
                          <CardTour {...tour} />
                      </div>
                  </FadeInOnScroll>
              </div>
          </div>
      </div>
  );
};

export default TourView;