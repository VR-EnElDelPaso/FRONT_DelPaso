import { useEffect, useState } from "react";
import { Tour } from "../../types/tour";
import { getTourSuggestions } from "../../services/Tour";
import TourSuggestionCard from "./TourSuggestionCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TourSuggestionsProps {
  currentTourId: string;
  quantity: number;
}

export default function TourSuggestions({
  currentTourId,
  quantity,
}: TourSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await getTourSuggestions([currentTourId], quantity);
      if (response.ok) {
        setSuggestions(response.data);
      }
    };
    fetchSuggestions();
  }, [currentTourId, quantity]);

  if (suggestions.length === 0) return null;

  return (
    <div>
      <h2 className="text-[28px] md:text-[32px] font-kaiseiDecol font-normal text-dark">
        Te podría interesar...
      </h2>
      {/* Desktop view */}
      <div className="hidden md:block space-y-6">
        {suggestions.map((tour) => (
          <TourSuggestionCard key={tour.id} tour={tour} />
        ))}
      </div>
      {/* Mobile view with Swiper */}
      <div className="md:hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={true}
          pagination={{ clickable: true }}
          className="py-2"
        >
          {suggestions.map((tour) => (
            <SwiperSlide key={tour.id}>
              <TourSuggestionCard tour={tour} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
