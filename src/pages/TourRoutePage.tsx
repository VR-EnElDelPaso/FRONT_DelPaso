// src/pages/TourRoutePage.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import Dialog from "../shared/components/Tour/Dialog";
import TourIframe from "../shared/components/Tour/TourIframe";
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

  // Loading and error handling
  if (!tour) return <div>Cargando...</div>;

  return (
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
          <p className="uppercase text-sm">{dateFormatter(tour.created_at)}</p>
        </div>

        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}
