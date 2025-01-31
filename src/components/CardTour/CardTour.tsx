import { useNavigate } from "react-router-dom";
import { Star, Share2, Mail } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";
import { Tour } from "../../types/tour";
import { dateFormatter } from "../../utils/dateFormatter";
import { Button } from "../ui/button";

export default function TourCard({
  id,
  name,
  description,
  price,
  created_at,
  stars,
  image_url,
}: Tour) {
  const navigate = useNavigate();
  const { setCartItem } = useCartStore();

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
      <img
        src={image_url}
        alt={name}
        className="w-full md:w-auto h-[300px] md:h-[400px] object-cover rounded-sm"
      />
      <div className="w-full flex flex-col text-left md:w-1/2">
        <div className="space-y-2">
          <h1 className="text-[28px] md:text-[32px] font-kaiseiDecol font-normal text-dark">
            {name}
          </h1>
          <div className="flex items-center justify-start gap-1">
            <Star className="fill-primary text-primary w-5 h-5" />
            <span className="text-xl font-bold text-neutral-500">{stars}</span>
          </div>
          <p className="text-neutral-400 text-sm font-medium">
            {dateFormatter(created_at)}
          </p>
          <p className="pt-2 text-md font-extralight text-dark break-words overflow-hidden max-h-[150px]">
            {description}
          </p>
          <h1 className="pt-2 text-xl font-bold text-dark">${price} MXN</h1>
        </div>

        <div className="mt-6 flex flex-col space-y-4 w-full">
          <Button
            variant="default"
            className="h-12 shadow-none rounded-xl text-white w-full md:w-auto"
            onClick={() => {
              setCartItem({ id, isSelected: true, quantity: 1 });
              navigate(`/checkout`, { state: { tourIds: [id] } });
            }}
          >
            Comprar ahora
          </Button>
          <Button
            variant="outline"
            className="h-12 shadow-none rounded-xl text-dark w-full md:w-auto"
            onClick={() => setCartItem({ id, isSelected: true, quantity: 1 })}
          >
            Agregar al carrito
          </Button>
        </div>

        <div className="space-x-6 mt-6 flex items-center justify-end">
          <Button variant="link" aria-label="Compartir" className="p-0">
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
  );
}
