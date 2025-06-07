import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useSwiper } from "swiper/react";

export const NavigationButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="absolute top-1/2 w-full flex justify-between px-4 -translate-y-1/2 z-20 text-white text-3xl select-none">
      <button
        onClick={() => swiper.slidePrev()}
        aria-label="Previous slide"
        className="cursor-pointer rounded-full hover:bg-white/20 transition-colors p-2"
      >
        <BsChevronCompactLeft />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        aria-label="Next slide"
        className="cursor-pointer rounded-full hover:bg-white/20 transition-colors p-2"
      >
        <BsChevronCompactRight />
      </button>
    </div>
  );
};