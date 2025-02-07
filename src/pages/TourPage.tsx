import { useParams } from "react-router-dom";
import CardTour from "../components/CardTour/CardTour";
import useFetchTourById from "../hooks/useFetchTourById";
import { FadeInOnScroll } from "../components/animations/FadeInOnScroll";
import ReviewsList from "../components/Reviews/ReviewsList";
import TourSuggestions from "../components/TourSuggestions/TourSuggestions";

export default function TourPage() {
  const { id } = useParams<{ id: string }>();
  const tourData = useFetchTourById(id || "");

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

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 justify-center md:px-12">
            {/* Reviews Section - Ahora a la izquierda */}
            <div className="w-full md:w-3/4 order-2 md:order-none">
              <h2 className="text-[28px] md:text-[32px] font-kaiseiDecol font-normal text-dark">
                Reseñas
              </h2>
              <ReviewsList tourId={id || ""} />
            </div>

            {/* Suggestions Section - Ahora a la derecha */}
            <div className="w-full md:w-1/2 order-1 md:order-none">
              <TourSuggestions currentTourId={id || ""} quantity={10} />
              <hr className="border-gray-300 my-6 md:hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
