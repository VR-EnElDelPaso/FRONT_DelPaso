import { Review } from "@/types/Review";
import RatingStars from "@/shared/components/RatingStars";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-lg mt-4">
      <h4 className="font-medium text-neutral-500 text-sm mb-2">
        {review.user.display_name || review.user.name}
      </h4>
      <div className="mb-4">
        <RatingStars value={review.score} onChange={() => {}} noHover={true} />
      </div>
      <p className="text-dark text-md leading-relaxed">{review.comment}</p>
      <hr className="border-t border-neutral-300 my-4" />
    </div>
  );
}
