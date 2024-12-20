import { useParams } from "react-router-dom";
import CardTour from "../components/CardTour/CardTour";
import useFetchTourById from "../hooks/useFetchTourById";
import { FadeInOnScroll } from "../components/animations/FadeInOnScroll";
import ReviewsList from "../components/Reviews/ReviewsList";

const Tour = () => {
  const { id } = useParams<{ id: string }>();
  const tourData = useFetchTourById(id || "");

  console.log(tourData);
  if (!tourData) return <div>Cargando...</div>;

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-4 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <FadeInOnScroll distance={20} duration={2}>
            <div className="mb-12 md:mb-16 lg:mb-20">
              <CardTour {...tourData} />
            </div>
          </FadeInOnScroll>

          <section className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-medium font-kaiseiDecol">Reseñas</h2>
            </div>
            <ReviewsList tourId={id || ""} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Tour;
