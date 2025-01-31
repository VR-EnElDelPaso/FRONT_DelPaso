import { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Review } from "@/types/Review";
import { ReviewService } from "@/services/Review";
import ReviewCard from "./ReviewCard";
import ReviewCardSkeleton from "./ReviewCardSkeleton";

interface ReviewsListProps {
  tourId: string;
}

const REVIEWS_PER_PAGE = 5;

export default function ReviewsList({ tourId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchReviews = useCallback(async () => {
    if (isLoading) return;

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

        if (skip === 0) {
          setReviews(newReviews);
        } else {
          setReviews((prevReviews) => [...prevReviews, ...newReviews]);
        }

        const currentTotal =
          skip === 0 ? newReviews.length : reviews.length + newReviews.length;
        setHasMore(currentTotal < response.data.total);

        if (currentTotal < response.data.total) {
          setSkip(currentTotal);
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [tourId, skip, isLoading, reviews.length]);

  useEffect(() => {
    setSkip(0);
    setReviews([]);
    setHasMore(true);
    fetchReviews();
  }, [tourId]);

  if (reviews.length === 0 && isLoading) {
    return (
      <div className="mt-6">
        <ReviewCardSkeleton />
        <ReviewCardSkeleton />
      </div>
    );
  }

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
        scrollThreshold={0.8}
      >
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
