import { useState } from "react";
import Dialog from "../shared/components/Tour/Dialog";
import TourIframe from "../shared/components/Tour/TourIframe";

export default function TourRoutePage() {
  const [isBlurred, setIsBlurred] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (data: { rating: number; comment: string }) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="relative font-inter text-dark">
      {/* Tour iframe */}
      <TourIframe
        src="https://kuula.co/share/collection/7cp8f?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1"
        isBlurred={isBlurred}
        onStart={() => setIsBlurred(false)}
      />

      {/* Content */}
      <section className="m-4 md:m-16">
        <div className="flex justify-end mb-16 md:mb-2">
          {/* Button */}
          <button
            className="mt-4 md:mt-0 px-6 py-2 text-white font-bold rounded-lg text-sm hover:bg-opacity-90 transition-colors duration-200 bg-primary/90"
            onClick={() => setIsDialogOpen(true)}
          >
            Marcar como terminado
          </button>
        </div>

        {/* Texts */}
        <h2 className="text-4xl font-kaiseiDecol mb-2 font-medium">
          Rosa Villa Real - Miel
        </h2>
        <div className="max-w-4xl font-light text-base space-y-8 my-4">
          <p>
            En este recorrido conocerás la obra de Emilio Rosado, una artista
            que se especializa en el arte textil, con un fuerte discurso
            concientizador de temas de interés social en este recorrido
            conocerás la obra de Emilio Rosado, una artista que se especializa
            en el arte textil, con un fuerte discurso concientizador de temas de
            interés social.
          </p>
          <p>
            En este recorrido conocerás la obra de Emilio Rosado, una artista
            que se especializa en el arte textil, con un fuerte discurso
            concientizador de temas de interés social.
          </p>
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
