import { useFetchMuseums } from "@/features/museum/museum.querys";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { NavigationButtons } from "./NavigationButtons";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export const CarruselMuseums = () => {
  // ---- Hooks ----
  const navigate = useNavigate();
  const { data: museumsResponse } = useFetchMuseums(true);
  const museums = museumsResponse?.data || [];

  // ---- Handlers ----
  const handleSlideClick = (museumId: string) => {
    navigate(`/museum/${museumId}`);
  };

  return (
    <div className="block h-[300px] sm:h-[400px] md:h-[500px] relative bg-[url('/assets/images/pictures/pasillo.png')] bg-cover bg-center">
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-4 sm:px-6 md:px-8">
        {!museums.length ? (
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg w-fit mx-auto flex flex-col items-center">
            <Skeleton className="h-6 w-[200px] mb-2 bg-white/30" />
            <Skeleton className="h-6 w-[400px] mb-2 bg-white/30" />
            <Skeleton className="h-6 w-32 mb-2 bg-white/30" />
          </div>
        ) : (
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={10}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Autoplay, Pagination]}
            className="w-full h-full relative"
          >
            {museums.map((museum) => (
              <SwiperSlide key={museum.id}>
                <div className="flex flex-col w-full items-center justify-center h-full text-white text-center">
                  <div
                    className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg cursor-pointer hover:transform hover:scale-105 transition-transform duration-200 ease-in-out"
                    onClick={() => handleSlideClick(museum.id)}
                  >
                    <p className="tracking-[0.5rem] pb-2">•MUSEOS</p>
                    <p className="pb-6 text-xl md:text-3xl font-semibold font-kaiseiDecol transition-all duration-200 hover:underline hover:decoration-2 hover:underline-offset-4">
                      {museum.name}
                    </p>
                    <p className="mt-2">
                      Descubre todos los Museos Universitarios que colaboran con
                      MUVI
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {museums.length > 1 && (
              <div className="hidden md:block">
                <NavigationButtons />
              </div>
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
};
