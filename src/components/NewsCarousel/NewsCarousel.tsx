import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import CarouselSlide from './CarouselSlide';
import { slides } from './slide-data';
import { variants, swipeConfidenceThreshold, swipePower } from './animations';
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons';

const NewsCarousel: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, slides.length, page);

  const paginate = useCallback((newDirection: number) => {
    setPage((prevPage) => [prevPage[0] + newDirection, newDirection]);
  }, [setPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 7000);

    return () => clearInterval(interval);
  }, [paginate]);

  const handleSlideChange = (index: number) => {
    setPage([index, 0]);
  };

  return (
    <div className="bg-black relative h-[calc(100vh-5rem)] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate={index === imageIndex ? "center" : "exit"}
            exit="exit"
            className={`absolute inset-0 ${index === imageIndex ? 'z-10' : 'z-0 pointer-events-none'}`}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <CarouselSlide
              title={slide.title}
              description={slide.description}
              imageUrl={slide.imageUrl}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute bottom-16 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-32 h-0.5 bg-white bg-opacity-50 z-20"></div>
      <div className="z-30 absolute bottom-4 sm:bottom-8 right-4 sm:right-8 md:right-40 flex space-x-2 sm:space-x-8">
        {slides.map((_, index) => (
          <button
            key={slides[index].id}
            onClick={() => handleSlideChange(index)}
            className={`text-white ${imageIndex === index ? 'font-bold' : 'text-gray-300'} w-6 h-6 text-xs sm:text-sm`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <SocialMediaIcons 
        containerClass="z-30 p-1 bg-black rounded-xl bg-opacity-65 absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 space-y-2 text-white hidden sm:block" 
        iconClass="text-xl sm:text-2xl md:text-3xl"
      />
    </div>
  );
};

export default NewsCarousel;
