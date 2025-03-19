import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCheckPurchasedTour } from "@/querys/tour.querys";
import { useCartStore } from "@/stores/useCartStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmAlert } from "./SeeTourAlert";

export const TourCardButtons = ({ tourId }: { tourId: string }) => {
  // ----[ State ]----
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // ----[ Hooks ]----
  const navigate = useNavigate();
  const { setCartItem } = useCartStore();
  const { data: purchasedResponse, isPending: isPurchasedPending } =
    useCheckPurchasedTour(tourId);
  
  console.log(purchasedResponse);

  // ----[ Handlers ]----
  const handleCloseAlert = () => setIsAlertOpen(false);
  const handleConfirmAlert = () => {
    handleCloseAlert();
    navigate(`/tours/view/${tourId}`);
  };

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
            onClick={() => setIsAlertOpen(true)}
          >
            Ver tour
          </Button>
        </div>
        <ConfirmAlert
          isOpen={isAlertOpen}
          onClose={handleCloseAlert}
          onConfirm={handleConfirmAlert}
          onCancel={handleCloseAlert}
          title="¿Estás seguro?"
          description='Al hacer clic en "Continuar", iniciarás el tour y solo tendrás
            acceso a él por 24 horas.'
          confirmText="Continuar"
          cancelText="Cancelar"
        />
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
