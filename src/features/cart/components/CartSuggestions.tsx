import { useCallback, useEffect, useMemo, useState } from "react";
import { Tour } from "../../../shared/types/Tour";
import { CartListItem } from "./CartList";
import { getTourSuggestions, checkPurchasedTours } from "../../tour/tour.services";
import { useCartStore } from "../../../stores/useCartStore";
import RatingStars from "@/shared/components/RatingStars";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  cartListData: CartListItem[];
  quantity: number;
}

export const CartSuggestions = ({ cartListData, quantity }: Props) => {
  const [fetchedTour, setFetchedTour] = useState<Tour | null>();
  const [isLoading, setIsLoading] = useState(false);

  const { setCartItem } = useCartStore();
  const { isAuthenticated } = useAuth();

  const tourIds = useMemo(
    () => cartListData.map((item) => item.id),
    [cartListData]
  );

  const fetchTourSuggestion = useCallback(async () => {
    setIsLoading(true);
    try {
      // Paso 1: Obtener las sugerencias
      const response = await getTourSuggestions(tourIds, quantity + 5); // Pedir más por si hay que filtrar
      if (!response.ok || !response.data || response.data.length === 0) {
        setFetchedTour(null);
        return;
      }
      
      let suggestedTours = response.data;
      
      // Paso 2: Si el usuario está autenticado, filtrar tours con acceso activo
      if (isAuthenticated && suggestedTours.length > 0) {
        // Obtener IDs de los tours sugeridos
        const suggestedTourIds = suggestedTours.map((tour: Tour) => tour.id);
        
        // Verificar cuáles tienen acceso activo
        const purchasedResponse = await checkPurchasedTours(suggestedTourIds);
        
        if (purchasedResponse?.ok && purchasedResponse.data && purchasedResponse.data.length > 0) {
          // Filtrar tours que no tienen acceso activo
          const activeTourIds = new Set(purchasedResponse.data);
          suggestedTours = suggestedTours.filter((tour: Tour) => !activeTourIds.has(tour.id));
        }
      }
      
      // Si después de filtrar queda al menos un tour, mostrar el primero
      if (suggestedTours.length > 0) {
        setFetchedTour(suggestedTours[0]);
      } else {
        setFetchedTour(null);
      }
    } catch (error) {
      console.error("Error fetching tour suggestions:", error);
      setFetchedTour(null);
    } finally {
      setIsLoading(false);
    }
  }, [tourIds, quantity, isAuthenticated]);

  useEffect(() => {
    fetchTourSuggestion();
  }, [fetchTourSuggestion]);

  if (isLoading) {
    return (
      <div>
        <div className="text-center">
          <h1 className="text-2xl font-kaiseiDecol">Podría Interesarte</h1>
        </div>
        <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-4"></hr>
        <div className="flex justify-center items-center h-24">
          <div className="animate-pulse w-full">
            <div className="bg-gray-200 h-24 w-full rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay tour para sugerir, mostrar un mensaje alternativo o nada
  if (!fetchedTour) {
    return null;
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-kaiseiDecol">Podría Interesarte</h1>
      </div>
      <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-4"></hr>
      <div className="flex flex-col gap-3">
        <div className="p-2 flex flex-col gap-2">
          <TourCard tour={fetchedTour} />
        </div>
        <div className="flex">
          <button
            className="mx-auto px-6 border bg-primary text-white p-2 rounded-xl hover:bg-primaryHover hover:text-white transition-colors duration-300"
            onClick={() => {
              setCartItem({
                id: fetchedTour.id,
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
  );
};

const TourCard = ({ tour }: { tour: Tour }) => {
  return (
    <div className="flex gap-4">
      <img
        src={tour.image_url}
        alt={tour.name}
        className="w-24 h-24 object-cover rounded-[15px] flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h2 className="font-kaiseiDecol text-lg mb-1 truncate">{tour.name}</h2>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
          {tour.description}
        </p>
        <div className="flex items-center justify-between">
          <RatingStars value={tour.stars} noHover size="small" />
          <span className="font-medium text-sm">${tour.price}</span>
        </div>
      </div>
    </div>
  );
};