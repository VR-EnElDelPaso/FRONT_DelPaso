import React, { useEffect, useState } from 'react';
import CardTour, { CardTourProps } from "./CardTour";
import { FadeInOnScroll } from "../animations/FadeInOnScroll";

const tourData: CardTourProps[] = [
    {
      id: "1a79bf61-4694-47c1-822d-761dad13a5cd",
      date: '2024-05-07',
      title: 'Teresa Olmedo. PALABRALMA',
      imagePath: '/PA_Obra31.jpg',
      description: 'En este recorrido conocerás la obra de Teresa Olmedo, una artista que se especializa en el arte textil, con un fuerte discurso concientizador de temas de interés social.',
      prize: 50
    },
    {
      id: "a63d47b7-8e2c-4112-866c-5dedg718b5e6",
      date: '2024-06-07',
      title: 'Teresa Olmedo. AMAR',
      imagePath: '/PA_Obra23.jpg',
      description: 'En este recorrido conocerás la obra de Teresa Olmedo, una artista que se especializa en el arte textil, con un fuerte discurso concientizador de temas de interés social.',
      prize: 50
    },
];

const fetchTourById = (id: string): Promise<CardTourProps | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const tour = tourData.find(tour => tour.id === id);
            resolve(tour);
        });
    });
};

interface TourViewProps {
    tourId: string;
}

const TourView: React.FC<TourViewProps> = ({ tourId }) => {
    const [tour, setTour] = useState<CardTourProps | null>(null);

    useEffect(() => {
        const loadTour = async () => {
            const fetchedTour = await fetchTourById(tourId);
            if (fetchedTour) {
                setTour(fetchedTour);
            }
        };

        loadTour();
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