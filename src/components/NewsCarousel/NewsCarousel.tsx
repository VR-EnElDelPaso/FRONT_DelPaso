// NewsCarousel.tsx
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
    }, 5000);

    return () => clearInterval(interval);
  }, [paginate]);

  const handleSlideChange = (index: number) => {
    setPage([index, 0]);
  };

  return (
    <div className="bg-black relative h-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        {slides.map((slide, index) => (
          index === imageIndex && (
            <motion.div
              key={slide.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
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
          )
        ))}
      </AnimatePresence>
      <div className="absolute bottom-16 w-1/3 right-32 h-0.5 bg-white bg-opacity-50"></div>
      <div className="z-10 absolute bottom-8 right-40 -space-x-20 flex">
      {slides.map((_, index) => (
        <button
          key={slides[index].id}
          onClick={() => handleSlideChange(index)}
          className={`text-white ${imageIndex === index ? 'font-bold' : 'text-gray-300'} w-6 h-6`}
        >
          {index + 1}
        </button>
      )).reverse()}
      </div>
      <SocialMediaIcons containerClass="z-10 p-1 bg-black rounded-xl bg-opacity-65 absolute right-4 top-1/2 transform -translate-y-1/2 space-y-2 text-white hidden md:block" iconClass="text-3xl"/>
    </div>
  );
};

export default NewsCarousel;
