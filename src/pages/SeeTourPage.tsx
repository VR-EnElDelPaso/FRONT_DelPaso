import { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewDialog from "../shared/components/Tour/ReviewDialog";
import TourIframe from "../shared/components/Tour/TourIframe";
import ReviewsList from "../components/Reviews/ReviewsList";
import TourSuggestions from "../components/TourSuggestions/TourSuggestions";
import { dateFormatter } from "../utils/dateFormatter";
import { useCheckPurchasedTour, useFetchTourById, useFetchTourUrl } from "@/querys/tour.querys";
import Loader from "@/shared/components/Loader";

export default function SeeTourPage() {
  // ----[ State ]----
  const [isBlurred, setIsBlurred] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ----[ Hooks ]----
  const id = useParams().id ?? "";
  const { data: TourResponse, isPending: TourIsPending } = useFetchTourById(id);
  const { data: TourPurchaseResponse, isPending: TourPurchaseIsPending } = useCheckPurchasedTour(id);
  const { data: TourUrlResponse, isPending: TourUrlIsPending } = useFetchTourUrl(id, TourPurchaseResponse?.data?.purchased);

  // ----[ Constants ]----
  const tour = TourResponse?.data

  // ----[ Handlers ]----
  const handleSubmit = (data: { rating: number; comment: string }) => {
    console.log("Form submitted:", data);
  };

  // ----[ Render ]----
  if (TourIsPending) return <Loader />;
  if (!tour) return <p>Tour not found</p>;
  if (TourPurchaseIsPending) return <Loader />;
  if (!TourPurchaseResponse?.data?.purchased) return <p>Not purchased</p>;
  if (TourUrlIsPending) return <Loader />;
  if (!TourUrlResponse?.data?.tour_url) return <p>URL not found</p>;

  return (
    <>
      <div className="relative font-inter text-dark">
        {/* Tour iframe */}
        <TourIframe
          src={TourUrlResponse?.data?.tour_url}
          isBlurred={isBlurred}
          onStart={() => setIsBlurred(false)}
        />

        {/* Content */}
        <section className="mx-6 my-8 md:mx-24">
          <div className="flex justify-end mb-8 md:mb-2">
            <button
              className="px-6 py-2 text-sm font-bold text-white transition-colors duration-200 rounded-lg hover:bg-opacity-90 bg-primary/90"
              onClick={() => setIsDialogOpen(true)}
            >
              Marcar como terminado
            </button>
          </div>

          {/* Texts */}
          <h2 className="mb-2 text-4xl font-medium font-kaiseiDecol">
            {tour.name}
          </h2>
          <div className="max-w-4xl my-4 space-y-8 text-base font-light">
            <p>{tour.description}</p>
            <p className="text-sm uppercase">
              {dateFormatter(tour.created_at)}
            </p>
          </div>

          <hr className="my-4 border-t border-neutral-300" />

          {/* Reviews and Suggestions */}
          <div className="mt-16">
            <div className="flex flex-col gap-8 md:flex-row md:gap-24 lg:gap-32">
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
