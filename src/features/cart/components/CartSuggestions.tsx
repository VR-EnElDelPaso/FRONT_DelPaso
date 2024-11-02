import { useCallback, useEffect, useMemo, useState } from "react";
import { Tour } from "../../../shared/types/Tour";
import { CartListItem } from "./CartList";
import { getTourSuggestions } from "../../../services/Tour";
import { useCartStore } from "../../../stores/useCartStore";

interface Props {
  cartListData: CartListItem[];
  quantity: number;
}

export const CartSuggestions = ({ cartListData, quantity }: Props) => {
  const [fetchedTour, setFetchedTour] = useState<Tour | null>();

  const { setCartItem } = useCartStore();

  const tourIds = useMemo(
    () => cartListData.map(item => item.id),
    [cartListData])

  const fetchTourSuggestion = useCallback(async () => {
    const response = await getTourSuggestions(tourIds, quantity);
    if (!response.ok) return;
    setFetchedTour(response.data[0]);
  }, [tourIds, quantity]);

  useEffect(() => {
    fetchTourSuggestion()
  }, [fetchTourSuggestion]);

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-kaiseiDecol">Podría Interesarte</h1>
      </div>
      <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-4"></hr>
      <div className="flex flex-col gap-3">
        <div className="p-2 flex flex-col gap-2">
          {fetchedTour && <TourCard tour={fetchedTour} />}
        </div>
        <div className="flex">
          <button
            className="mx-auto px-6 border border-primary text-primary p-2 rounded-xl hover:bg-primaryHover hover:text-white transition-colors duration-300"
            onClick={() => {
              setCartItem({
                id: fetchedTour!.id,
                isSelected: true,
                quantity: 1,
              });
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

const TourCard = ({ tour }: { tour: Tour }) => {
  return (
    <div className="flex gap-2">
      <img src={tour.image_url} alt={tour.name} className="w-20 h-20 object-cover rounded-md" />
      <div>
        <h2 className="font-kaiseiDecol">{tour.name}</h2>
        <p className="font-inter text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, quaerat quia, eum
        </p>
        <div className="flex justify-end">
          <h2 className="font-bold">${tour.price}</h2>
        </div>
      </div>
    </div>
  )
}
