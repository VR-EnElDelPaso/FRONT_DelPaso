import { Tour } from "@/types/tour";
import RatingStars from "@/shared/components/RatingStars";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface TourSuggestionCardProps {
  tour: Tour;
}

export default function TourSuggestionCard({ tour }: TourSuggestionCardProps) {
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="mt-4">
      <Link
        to={`/tours/${tour.id}`}
        onClick={handleLinkClick}
        className="rounded-lg overflow-hidden cursor-pointer group "
      >
        <div className="relative">
          <img
            src={tour.image_url}
            alt={tour.name}
            className="rounded-xl w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-kaiseiDecol mb-2">{tour.name}</h3>
          <div className="mb-2">
            <RatingStars
              value={tour.stars}
              onChange={() => {}}
              noHover={true}
            />
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {tour.description}
          </p>
          <div className="flex justify-start">
            <Button
              className="text-white transition-colors duration-300 rounded-xl mb-4"
              size="lg"
            >
              Ver más
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
