import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCheckPurchasedTour } from "@/querys/tour.querys";
import { useCartStore } from "@/stores/useCartStore";
import { useNavigate } from "react-router-dom";

export const TourCardButtons = ({ tourId }: { tourId: string }) => {
  // ----[ Hooks ]----
  const navigate = useNavigate();
  const { setCartItem } = useCartStore();
  const { data: purchasedResponse, isPending: isPurchasedPending } =
    useCheckPurchasedTour(tourId);

  // ----[ Render ]----
  if (isPurchasedPending) {
    return (
      <>
        <div className="flex flex-col w-full mt-6 space-y-4">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      </>
    );
  } else if (purchasedResponse?.data?.purchased === true) {
    return (
      <>
        <div className="flex flex-col w-full mt-6 space-y-4">
          <Button
            variant="default"
            className="w-full h-12 text-white shadow-none rounded-xl md:w-auto"
            onClick={() => navigate(`/tours/view/${tourId}`)}
          >
            Ver tour
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col w-full mt-6 space-y-4">
          <Button
            variant="default"
            className="w-full h-12 text-white shadow-none rounded-xl md:w-auto"
            onClick={() => {
              setCartItem({ id: tourId, isSelected: true, quantity: 1 });
              navigate(`/checkout`, { state: { tourIds: [tourId] } });
            }}
          >
            Comprar ahora
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 shadow-none rounded-xl text-dark md:w-auto"
            onClick={() =>
              setCartItem({ id: tourId, isSelected: true, quantity: 1 })
            }
          >
            Agregar al carrito
          </Button>
        </div>
      </>
    );
  }
};
