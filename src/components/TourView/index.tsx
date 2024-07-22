import CardTour, { CardTourProps } from "./CardTour";
import { FadeInOnScroll } from "../animations/FadeInOnScroll";

const tourData: CardTourProps[] = [
    {
        id: 1,
        date: '2024-05-07',
        title: 'Teresa Olmedo. PALABRALMA',
        imagePath: '/PA_Obra31.jpg',
        description: 'En este recorrido conocerás la obra de Teresa Olmedo, una artista que se especializa en el arte textil, con un fuerte discurso concientizador de temas de interés social.',
        prize: 50
    },
];

export default function TourView() {
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-4 md:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto">
                    {tourData.map((tourData, id) => (
                        <FadeInOnScroll
                            key={id}
                            distance={20}
                            duration={2}
                        >
                            <div className="mb-12 md:mb-16 lg:mb-20">
                                <CardTour {...tourData} />
                            </div>
                        </FadeInOnScroll>
                    ))}
                </div>
            </div>
        </div>
    );
}