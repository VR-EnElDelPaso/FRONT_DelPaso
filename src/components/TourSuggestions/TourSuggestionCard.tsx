import { Tour } from "@/types/tour";
import RatingStars from "@/shared/components/RatingStars";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface TourSuggestionCardProps {
  tour: Tour;
}

export default function TourSuggestionCard({ tour }: TourSuggestionCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tours/${tour.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className=" rounded-lg overflow-hidden cursor-pointer group mt-4"
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
          <RatingStars value={tour.stars} onChange={() => {}} noHover={true} />
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {tour.description}
        </p>
        <div className="flex justify-end">
          <Button
            className=" text-white transition-colors duration-300 rounded-xl mb-4"
            size="lg"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            Ver más
          </Button>
        </div>
      </div>
    </div>
  );
}
