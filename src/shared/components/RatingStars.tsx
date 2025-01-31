import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingStarsProps {
  onChange: (rating: number) => void;
  value?: number;
  noHover?: boolean;
}

export default function RatingStars({
  onChange,
  value = 0,
  noHover = false,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value);

  const handleStarClick = (rating: number) => {
    if (noHover) return;
    setSelectedRating(rating);
    onChange(rating);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <FaStar
          key={rating}
          className={`w-6 h-6 ${
            !noHover && "cursor-pointer"
          } transition-colors ${
            rating <= (noHover ? value : hoverRating || selectedRating)
              ? "text-primary"
              : "text-primary/60"
          }`}
          onMouseEnter={() => !noHover && setHoverRating(rating)}
          onMouseLeave={() => !noHover && setHoverRating(0)}
          onClick={() => handleStarClick(rating)}
        />
      ))}
    </div>
  );
}
