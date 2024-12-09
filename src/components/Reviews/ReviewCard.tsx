import React from "react";
import { FaStar } from "react-icons/fa";
import { Review } from "@/types/Review";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (score: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-4 h-4 ${
              star <= score ? "text-primary" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div key={review.id} className="bg-white py-6 rounded-lg">
      <h4 className="font-semibold mb-2 text-neutral-400">
        {review.user.display_name || review.user.name}
      </h4>
      {renderStars(review.score)}
      <p className="mt-4 text-lg font-light">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
