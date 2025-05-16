// src/components/NewsCarousel/CarouselSlide.tsx
import React from "react";
import { CarouselSlideProps } from "./slide-data";
import { useNavigate } from "react-router-dom";

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  title,
  description,
  imageUrl,
}) => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate("/tours");
  };

  const handleVirtualTours = () => {
    navigate("/tours");
  };

  return (
    <div className="relative h-full">
      <img
        src={imageUrl}
        alt={title || "Slide background"}
        className="absolute inset-0 object-cover w-full h-full blur-sm"
        onError={(e) => {
          // Manejar errores de carga de imagen
          const target = e.target as HTMLImageElement;
          target.src =
            "https://placehold.co/1200x800/111/fff?text=Imagen+no+disponible";
        }}
      />
      <div className="absolute inset-0 bg-black opacity-55"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-4 text-white sm:p-8 md:p-12">
        <div className="flex flex-col max-w-xl">
          <p className="mb-2 text-sm sm:text-base md:text-lg uppercase">
            {title || ""}
          </p>
          <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl sm:mb-6">
            {description || ""}
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={handleSeeMore}
              className="px-4 py-2 text-sm text-black transition duration-200 bg-white bg-opacity-75 rounded-lg hover:bg-opacity-100 sm:text-base"
            >
              Conoce más
            </button>
            <button
              onClick={handleVirtualTours}
              className="px-4 py-2 text-sm text-white transition duration-300 border border-white rounded-lg hover:bg-white hover:text-black sm:text-base"
            >
              Visitas Virtuales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlide;
