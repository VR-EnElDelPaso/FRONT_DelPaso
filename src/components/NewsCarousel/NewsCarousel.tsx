import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CarouselSlide from './CarouselSlide';
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';

const slides = [
  {
    id: 1,
    title: 'Fernando del Paso',
    description: 'Descubre más sobre nuestros artistas y el arte emergente que se expone, ¡ahora mismo!',
    imageUrl: '/fernando-del-paso.jpg',
  },
  {
    id: 2,
    title: 'Museo Fernando del Paso',
    description: '¡Visita nuestro museo y descubre la historia de Fernando del Paso!',
    imageUrl: '/Museo-Fernando-del-Paso.jpg',
  },
  {
    id: 3,
    title: 'Fernando del Paso',
    description: '¡Conoce más sobre la vida y obra de Fernando del Paso!',
    imageUrl: 'fernando-del-paso-3.jpg',
  }
];

export default function NewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-full overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <CarouselSlide
                title={slide.title}
                description={slide.description}
                imageUrl={slide.imageUrl}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>
      <div className="absolute bottom-16 w-1/3 right-32 h-0.5 bg-white bg-opacity-50"></div>
      <div className="z-10 absolute bottom-8 right-40 -space-x-20">
        {[...slides].reverse().map((_, reversedIndex) => {
          const actualIndex = slides.length - 1 - reversedIndex;
          return (
            <button
              key={slides[actualIndex].id}
              onClick={() => handleSlideChange(actualIndex)}
              className={`text-white text-opacity-60 w-6 h-6 ${currentSlide === actualIndex ? 'text-opacity-100' : ''}`}
            >
              {actualIndex + 1}
            </button>
          );
        })}
      </div>
      <SocialMediaIcons containerClass="z-10 p-1 bg-black rounded-xl bg-opacity-65 absolute right-4 top-1/2 transform -translate-y-1/2 space-y-2 text-white hidden md:block" iconClass="text-3xl"/>
    </div>
  );
}
