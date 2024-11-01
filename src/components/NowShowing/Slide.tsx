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
    <Card className="grid grid-cols-1 md:grid-cols-[2fr,3fr] w-full h-full overflow-hidden border-none">
      <div className="relative h-[250px] md:h-full">
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-6 md:p-12 lg:p-16 flex flex-col gap-4 justify-center">
        <h2 className="text-2xl md:text-3xl font-kaiseiDecol font-bold">
          {title}
        </h2>

        <div className="flex items-end gap-2">
          <Star className="h-8 w-8" style={{ fill: "#B33424", color: "#B33424" }} />
          <span className="font-medium text-2xl">{rating}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{date}</span>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed max-w-[90%]">
          {description}
        </p>
      </div>
    </Card>
  );
}