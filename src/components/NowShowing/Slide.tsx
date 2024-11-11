import { Star, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SlideProps } from '@/components/NowShowing/slide-data';

export default function Slide({
  imageSrc,
  date,
  title,
  rating,
  description,
}: SlideProps) {
  return (
    <Card className="grid grid-cols-1 md:grid-cols-[2fr,3fr] w-full h-full overflow-hidden border-none shadow-none bg-transparent">
      <div className="relative h-[180px] sm:h-[200px] md:h-full">
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col gap-3 sm:gap-4 justify-center">
        <div className="flex flex-col sm:justify-between gap-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-kaiseiDecol font-bold">
            {title}
          </h2>

          <div className="flex items-center gap-2">
            <Star
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
              style={{ fill: "#B33424", color: "#B33424" }}
            />
            <span className="font-medium text-lg sm:text-xl md:text-2xl">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm sm:text-base text-muted-foreground">{date}</span>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[95%] sm:max-w-[90%]">
          {description}
        </p>
      </div>
    </Card>
  );
}