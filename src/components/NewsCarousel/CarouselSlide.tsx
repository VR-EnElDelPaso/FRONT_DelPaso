import React from 'react';
import { CarouselSlideProps } from './slide-data';

const CarouselSlide: React.FC<CarouselSlideProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="relative h-full">
      <img 
        src={imageUrl} 
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-55"></div>
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-white p-4 sm:p-8 md:p-12">
        <div className="max-w-xl flex flex-col">
          <p className="text-sm sm:text-base md:text-lg mb-2">{title}</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">{description}</h1>
          <div className="flex flex-row space-x-2">
            <button className="bg-white bg-opacity-75 text-black px-4 py-2 rounded-lg transition duration-200 hover:bg-opacity-100 text-sm sm:text-base">
              Conoce más
            </button>
            <button className="text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-white hover:text-black border border-white text-sm sm:text-base">
              Visitas Virtuales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlide;