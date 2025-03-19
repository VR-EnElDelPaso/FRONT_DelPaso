import { useParams } from "react-router-dom";
import CardTour from "../features/tour/components/TourCard/TourCard";
import { FadeInOnScroll } from "../components/animations/FadeInOnScroll";
import ReviewsList from "../components/Reviews/ReviewsList";
import TourSuggestions from "../components/TourSuggestions/TourSuggestions";
import Loader from "@/shared/components/Loader";
import { useFetchTourById } from "@/querys/tour.querys";

export default function TourPage() {
  const id = useParams().id || "";
  const { data: TourResponse, isPending: TourResponseIsPending } = useFetchTourById(id);

  if (TourResponseIsPending) return <Loader />;
  if (!TourResponse?.data) return <div>Not found</div>;

  const tourData = TourResponse.data;

  return (
    <div className="bg-gray-50">
      <div className="container px-4 py-4 mx-auto md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <FadeInOnScroll distance={20} duration={2}>
            <div className="mb-12 md:mb-16 lg:mb-20">
              <CardTour {...tourData} />
            </div>
          </FadeInOnScroll>

          <div className="flex flex-col justify-center gap-8 md:flex-row md:gap-16 lg:gap-24 md:px-12">
            {/* Reviews Section - Ahora a la izquierda */}
            <div className="order-2 w-full md:w-3/4 md:order-none">
              <h2 className="text-[28px] md:text-[32px] font-kaiseiDecol font-normal text-dark">
                Reseñas
              </h2>
              <ReviewsList tourId={id || ""} />
            </div>

            {/* Suggestions Section - Ahora a la derecha */}
            <div className="order-1 w-full md:w-1/2 md:order-none">
              <TourSuggestions currentTourId={id || ""} quantity={10} />
              <hr className="my-6 border-gray-300 md:hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
