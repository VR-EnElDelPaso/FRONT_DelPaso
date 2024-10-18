import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingStarsProps {
  onChange: (rating: number) => void;
  value?: number;
}

export default function RatingStars({ onChange, value = 0 }: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    onChange(rating);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <FaStar
          key={rating}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            rating <= (hoverRating || selectedRating)
              ? "fill-primary text-primary"
              : "text-primary/60"
          }`}
          onMouseEnter={() => setHoverRating(rating)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleStarClick(rating)}
        />
      ))}
    </div>
  );
}
