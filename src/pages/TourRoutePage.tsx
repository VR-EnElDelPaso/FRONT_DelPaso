import { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewDialog from "../shared/components/Tour/ReviewDialog";
import TourIframe from "../shared/components/Tour/TourIframe";
import ReviewsList from "../components/Reviews/ReviewsList";
import TourSuggestions from "../components/TourSuggestions/TourSuggestions";
import useFetchTourById from "../hooks/useFetchTourById";
import { dateFormatter } from "../utils/dateFormatter";

export default function TourRoutePage() {
  const { id } = useParams();
  const tour = useFetchTourById(id || "");

  const [isBlurred, setIsBlurred] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (data: { rating: number; comment: string }) => {
    console.log("Form submitted:", data);
  };

  if (!tour) return <div>Cargando...</div>;

  return (
    <>
      <div className="relative font-inter text-dark">
        {/* Tour iframe */}
        <TourIframe
          src={tour.url}
          isBlurred={isBlurred}
          onStart={() => setIsBlurred(false)}
        />

        {/* Content */}
        <section className="mx-6 my-8 md:mx-24">
          <div className="flex justify-end mb-8 md:mb-2">
            <button
              className="px-6 py-2 text-white font-bold rounded-lg text-sm hover:bg-opacity-90 transition-colors duration-200 bg-primary/90"
              onClick={() => setIsDialogOpen(true)}
            >
              Marcar como terminado
            </button>
          </div>

          {/* Texts */}
          <h2 className="text-4xl font-kaiseiDecol mb-2 font-medium">
            {tour.name}
          </h2>
          <div className="max-w-4xl font-light text-base space-y-8 my-4">
            <p>{tour.description}</p>
            <p className="uppercase text-sm">
              {dateFormatter(tour.created_at)}
            </p>
          </div>

          <hr className="border-t border-neutral-300 my-4" />

          {/* Reviews and Suggestions */}
          <div className="mt-16">
            <div className="flex flex-col md:flex-row gap-8 md:gap-24 lg:gap-32">
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

          <ReviewDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSubmit={handleSubmit}
          />
        </section>
      </div>
    </>
  );
}
