import React from "react";

import artistIllustration from "/assets/images/artist.jpeg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center justify-center px-4 py-4 bg-gray-50">
      <div className="flex flex-col items-center justify-between w-full max-w-4xl gap-8 lg:flex-row">
        {/* Content Section */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6">
            <span className="text-lg font-medium text-gray-500">Oooops</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl">
            Parece que te perdiste
            <br />
            entre tantos cuadros
          </h1>

          <p className="max-w-md mx-auto mb-8 text-lg text-gray-600 lg:mx-0">
            Pero no te preocupes,{" "}
            <span className="font-semibold text-gray-900">MUVI</span> está aquí
            para guiarte de vuelta a tu recorrido. Usa el menú para encontrar el
            camino correcto.
          </p>

          <Button
            onClick={handleGoBack}
            className="px-8 py-3 font-semibold text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
          >
            Regresar inicio
          </Button>
        </div>

        {/* Illustration Section */}
        <div className="flex justify-center flex-1 lg:justify-end">
          <div className="relative">
            <img
              src={artistIllustration}
              alt="Artist painting illustration"
              className="w-full h-auto max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
