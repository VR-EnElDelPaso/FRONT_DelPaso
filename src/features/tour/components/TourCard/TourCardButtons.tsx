import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/stores/useCartStore";
import { useNavigate } from "react-router-dom";
import { checkPurchasedTour } from "@/features/tour/tour.services";
import { CheckedTourSuccessResponse } from "@/features/tour/types/tour.types";
import { ResponseDataTyped } from "@/shared/types/response-data.types";

export const TourCardButtons = ({ tourId }: { tourId: string }) => {
  // ----[ State ]----
  const [tourPurchaseData, setTourPurchaseData] =
    useState<ResponseDataTyped<CheckedTourSuccessResponse> | null>(null);
  const [tourPurchaseLoading, setTourPurchaseLoading] = useState(true);
  const [, setTourPurchaseError] = useState<unknown>(null);

  // ----[ Hooks ]----
  const navigate = useNavigate();
  const { setCartItem } = useCartStore();

  // ----[ Effects ]----
  useEffect(() => {
    const fetchTourPurchase = async () => {
      if (!tourId) return;

      try {
        setTourPurchaseLoading(true);
        setTourPurchaseError(null);
        const response = await checkPurchasedTour(tourId);
        setTourPurchaseData(response);
        console.log("Purchased Response:", response?.data?.purchased);
      } catch (error) {
        setTourPurchaseError(error);
        console.error("Error checking tour purchase:", error);
      } finally {
        setTourPurchaseLoading(false);
      }
    };

    fetchTourPurchase();
  }, [tourId]);

  // ----[ Render ]----
  if (tourPurchaseLoading) {
    return (
      <>
        <div className="flex flex-col w-full mt-6 space-y-4">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      </>
    );
  } else if (tourPurchaseData?.data?.purchased === true) {
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