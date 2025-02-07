import { useEffect, useState } from "react";
import { Tour } from "../../types/tour";
import { getTourSuggestions } from "../../services/Tour";
import TourSuggestionCard from "./TourSuggestionCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import InfiniteScroll from "react-infinite-scroll-component";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TourSuggestionsProps {
  currentTourId: string;
  quantity: number;
}

const INITIAL_LOAD = 2;

export default function TourSuggestions({
  currentTourId,
  quantity,
}: TourSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Tour[]>([]);
  const [visibleSuggestions, setVisibleSuggestions] = useState<Tour[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchInitialSuggestions = async () => {
      const response = await getTourSuggestions([currentTourId], quantity);
      if (response.ok && response.data) {
        setSuggestions(response.data);
        setVisibleSuggestions(response.data.slice(0, INITIAL_LOAD));
        setHasMore(response.data.length > INITIAL_LOAD);
      }
    };
    fetchInitialSuggestions();
  }, [currentTourId, quantity]);

  const loadMore = () => {
    const currentLength = visibleSuggestions.length;
    const nextBatch = suggestions.slice(currentLength, currentLength + 2);

    if (nextBatch.length > 0) {
      setVisibleSuggestions((prev) => [...prev, ...nextBatch]);
      setHasMore(currentLength + nextBatch.length < suggestions.length);
    } else {
      setHasMore(false);
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <div>
      <h2 className="text-[28px] md:text-[32px] font-kaiseiDecol font-normal text-dark">
        Te podría interesar...
      </h2>

      {/* Desktop view with InfiniteScroll */}
      <div className="hidden md:block">
        <InfiniteScroll
          dataLength={visibleSuggestions.length}
          next={loadMore}
          hasMore={hasMore}
          loader={null}
          scrollThreshold={0.8}
        >
          <div className="space-y-6">
            {visibleSuggestions.map((tour) => (
              <TourSuggestionCard key={tour.id} tour={tour} />
            ))}
          </div>
        </InfiniteScroll>
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
