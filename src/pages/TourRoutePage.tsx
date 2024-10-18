import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TourRoutePage() {
  const [isBlurred, setIsBlurred] = useState(true);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsBlurred(false);
  };

  return (
    <div className="relative font-inter text-dark">
      {/* Iframe */}
      <section className="relative">
        <iframe
          className={`transition-opacity duration-500 ${
            isBlurred ? "blur-md opacity-50" : "blur-0 opacity-100"
          }`}
          width="100%"
          height="640"
          frameBorder="0"
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
          scrolling="no"
          src="https://kuula.co/share/collection/7cp8f?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1"
        ></iframe>
        {isBlurred && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 cursor-pointer text-center"
            onClick={handleClick}
          >
            <h2 className="font-semibold tracking-widest">SOLO EN MUVi</h2>
            <h1 className="text-3xl md:text-5xl font-medium font-kaiseiDecol mt-2">
              Empezar este recorrido
            </h1>
          </div>
        )}
      </section>

      {/* Content */}
      <section className="m-16">
        <div className="flex justify-end mb-16 md:mb-2">
          {/* Button */}
          <button
            className="mt-4 md:mt-0 px-6 py-2 text-white font-bold rounded-lg text-sm hover:bg-opacity-90 transition-colors duration-200 bg-[rgba(179,52,36,0.75)]"
            onClick={() => navigate(`/`)}
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

        <p className="uppercase text-sm text-gray-500">07 de Mayo de 2024</p>
      </section>
    </div>
  );
}
