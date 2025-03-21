import { Star, Share2, Mail } from "lucide-react";
import { Tour } from "../../../../types/tour";
import { dateFormatter } from "../../../../utils/dateFormatter";
import { Button } from "../../../../components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TourCardButtons } from "./TourCardButtons";

export default function TourCard({
  id,
  name,
  description,
  price,
  created_at,
  stars,
  image_url,
  url,
}: Tour) {
  // ----[ Hooks ]----
  const { toast } = useToast();
  console.log("TourCard -> tourId", id);

  // ----[ Functions ]----
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Enlace copiado",
      description: "El enlace se ha copiado al portapapeles",
      variant: "default",
    });
  };

  // ----[ Render ]----
  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-4xl gap-8 mx-auto md:flex-row">
        <img
          src={image_url}
          alt={name}
          className="w-full md:w-auto h-[300px] md:h-[400px] object-cover rounded-sm"
        />
        <div className="flex flex-col w-full text-left md:w-1/2">
          <div className="space-y-2">
            <h1 className="text-[28px] md:text-[32px] font-kaiseiDecol font-normal text-dark">
              {name}
            </h1>
            <div className="flex items-center justify-start gap-1">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="text-xl font-bold text-neutral-500">
                {stars}
              </span>
            </div>
            <p className="text-sm font-medium text-neutral-400">
              {dateFormatter(created_at)}
            </p>
            <p className="pt-2 text-md font-extralight text-dark break-words overflow-hidden max-h-[150px]">
              {description}
            </p>
            <h1 className="pt-2 text-xl font-bold text-dark">${price} MXN</h1>
          </div>

          {/* Main buttons */}
          <TourCardButtons tourId={id} />

          <div className="flex items-center justify-end mt-6 space-x-6">
            <Button
              variant="link"
              aria-label="Compartir"
              onClick={copyToClipboard}
              className="p-0"
            >
              <Share2 />
              Compartir
            </Button>
            <Button variant="link" aria-label="Contacto" className="p-0">
              <Mail />
              Contacto
            </Button>
          </div>
        </div>
      </div>
      <hr className="my-4 border-t border-neutral-300" />
    </>
  );
}
