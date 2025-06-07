import { Museum } from "@/shared/types/museums.types";

interface CarruselMuseumsProps {
  museums: Museum[];
}

export const CarruselMuseums = () => {
  

  return (
    <div className="block h-[300px] sm:h-[400px] md:h-[500px] relative">
      <img
        src="/assets/images/pictures/pasillo.png"
        alt="Imagen del pasillo del museo Fernando del Paso"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40">
        <div className="container mx-auto flex flex-col justify-center translate-y-8 sm:translate-y-10 md:translate-y-12 h-full px-4 sm:px-6 md:px-8">
          
        </div>
      </div>
    </div>
  );
};
