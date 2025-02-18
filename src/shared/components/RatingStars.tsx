import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingStarsProps {
  onChange?: (rating: number) => void;
  value?: number;
  noHover?: boolean;
  size?: "small" | "default";
}

export default function RatingStars({
  onChange,
  value = 0,
  noHover = false,
  size = "default",
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value);

  const handleStarClick = (rating: number) => {
    if (noHover) return;
    setSelectedRating(rating);
    onChange?.(rating);
  };

  const starSize = size === "small" ? "w-4 h-4" : "w-6 h-6";

  return (
    <div className={`flex gap-1 ${size === "small" ? "h-4" : "h-6"}`}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <FaStar
          key={rating}
          className={`${starSize} ${
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
