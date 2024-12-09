import React, { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Review } from "@/types/Review";
import { ReviewService } from "@/services/Review";
import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "./ReviewCardSkeleton";

interface ReviewsListProps {
  tourId: string;
}

const REVIEWS_PER_PAGE = 2;

const ReviewsList: React.FC<ReviewsListProps> = ({ tourId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Eliminar reviews.length de las dependencias para evitar la recreación innecesaria
  const fetchReviews = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      const response = await ReviewService.getReviewsByTour(
        tourId,
        REVIEWS_PER_PAGE,
        skip
      );

      if (response.ok && response.data) {
        const newReviews = response.data.reviews;
        setTotal(response.data.total);

        setReviews((prevReviews) => [...prevReviews, ...newReviews]);
        setHasMore(reviews.length + newReviews.length < response.data.total);
        setSkip((prevSkip) => prevSkip + REVIEWS_PER_PAGE);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [tourId, skip, isLoading, hasMore, reviews.length]); // `reviews.length` agregado

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      fetchReviews();
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, fetchReviews]);

  return (
    <div className="mt-8">
      <InfiniteScroll
        dataLength={reviews.length}
        next={fetchReviews}
        hasMore={hasMore}
        loader={
          <div className="mt-6">
            <ReviewCardSkeleton />
          </div>
        }
        endMessage={
          <p className="font-light text-xl text-center text-gray-500 py-8">
            {total === 0
              ? "No hay reseñas disponibles."
              : "Has llegado al final de las reseñas."}
          </p>
        }
        scrollThreshold={0.9}
      >
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ReviewsList;
