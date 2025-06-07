import { useFetchMuseums } from "@/features/museum/museum.querys";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export const CarruselMuseums = () => {
  const { data: museumsResponse } = useFetchMuseums();
  const museums = museumsResponse?.data || [];

  return (
    <div className="block h-[300px] sm:h-[400px] md:h-[500px] relative">
      <img
        src="/assets/images/pictures/pasillo.png"
        alt="Imagen del pasillo del museo Fernando del Paso"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40">
        <div className="container mx-auto flex flex-col z-10 justify-center translate-y-8 sm:translate-y-10 md:translate-y-12 h-full px-4 sm:px-6 md:px-8">
          <Swiper spaceBetween={20} slidesPerView={1} className="h-full">
            {museums.map((museum) => (
              <SwiperSlide key={museum.id}>
                <div className="flex flex-col w-full items-center justify-center h-full text-white text-center">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                    <p className="tracking-[0.5rem] pb-2">•MUSEOS</p>
                    <p className="pb-6 text-3xl font-semibold font-kaiseiDecol">
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
          </Swiper>
        </div>
      </div>
    </div>
  );
};
