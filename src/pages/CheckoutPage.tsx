import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTours } from "../services/tour.services";
import { Tour } from "../shared/types/Tour";
import Skeleton from "../shared/components/Skeleton";
import { useCartStore } from "../stores/useCartStore";
import { useAuth } from "../hooks/useAuth";
import { createOneOrder } from "@/services/orders.services";
import { createOnePreference } from "@/services/preference.services";
import { Loader2, AlertCircle } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loader from "@/shared/components/Loader";

export function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCartStore();
  const { isAuthenticated } = useAuth();
  const [orderState, setOrderState] = useState("Cart");
  const [errorDialog, setErrorDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
  });

  // Obtener IDs de tours y estado de URL
  const tourIds = useMemo(
    () => cartItems.filter((item) => item.isSelected).map((item) => item.id),
    [cartItems]
  );

  // Consultas y mutaciones
  const { data: toursResponse, isLoading } = useQuery({
    queryKey: ["tours", tourIds],
    queryFn: () => getTours(tourIds),
    enabled: tourIds.length > 0,
  });

  const tours = useMemo(
    () => (toursResponse?.ok ? (toursResponse.data as Tour[]) : []),
    [toursResponse]
  );

  // Cálculo del total
  const total = useMemo(
    () => tours.reduce((acc, tour) => acc + Number(tour.price), 0).toFixed(2),
    [tours]
  );

  const orderMutation = useMutation({ mutationFn: createOneOrder });
  const preferenceMutation = useMutation({ mutationFn: createOnePreference });

  // Obtener estado de la URL si viene de MercadoPago
  const status = new URLSearchParams(location.search).get("status");
  if (status && orderState !== status) {
    setOrderState(status);
  }

  // Acciones
  const showError = (title: string, description: string): void => {
    setErrorDialog({ isOpen: true, title, description });
  };

  const handlePay = async (): Promise<void> => {
    try {
      if (!toursResponse?.ok || toursResponse.data.length !== tourIds.length) {
        return showError(
          "Tours no disponibles",
          "Algunos tours ya no están disponibles."
        );
      }

      const order = await orderMutation.mutateAsync(tourIds);
      if (!order?.data?.id) {
        return showError(
          "Error al crear orden",
          "No se pudo generar la orden."
        );
      }

      const preference = await preferenceMutation.mutateAsync(order.data.id);
      if (!preference?.data?.init_point) {
        return showError("Error de MercadoPago", "No se pudo iniciar el pago.");
      }

      window.location.href = preference.data.init_point;
    } catch (error) {
      console.error(error);
      showError("Error en el pago", "Hubo un problema al procesar tu orden.");
    }
  };

  // Validaciones y redirecciones
  if (!isAuthenticated) {
    navigate("/auth", { state: { from: location }, replace: true });
    return null;
  }

  if (cartItems.length === 0 || (!isLoading && tours.length === 0)) {
    navigate("/cart", { replace: true });
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-4xl font-medium text-gray-800 mb-8 font-kaiseiDecol">
            Resumen de compra
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} paragraphRows={1} active paragraph />
              ))}
            </div>
          ) : (
            <div>
              {tours.map((tour) => (
                <div key={tour.id} className="border-2 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                      <div className="text-gray-600 mb-1">Recorrido</div>
                      <div className="font-medium break-words hyphens-auto overflow-hidden">
                        {tour.name}
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <div className="text-gray-600 mb-1">Autor</div>
                      <div className="font-medium">Emilio Rosado</div>
                    </div>
                    <div className="md:col-span-3">
                      <div className="text-gray-600 mb-1">
                        Cuota de Recuperación
                      </div>
                      <div className="font-medium">
                        ${Number(tour.price).toFixed(2)}
                      </div>
                    </div>
                    <div className="md:col-span-2 flex items-end justify-end mt-2 md:mt-0">
                      <button
                        onClick={() => navigate("/cart", { replace: true })}
                        className="text-primary hover:text-primary/90"
                      >
                        Eliminar Recorrido
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t my-6"></div>

          <div className="flex justify-end mb-6">
            <div className="text-right">
              <div className="text-gray-600 mb-1">Total a Pagar</div>
              <div className="text-2xl font-bold">${total}</div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate("/cart", { replace: true })}
              className="px-6 py-2 text-primary hover:text-primary/90"
            >
              Cancelar
            </button>
            <button
              onClick={handlePay}
              disabled={
                isLoading ||
                tours.length === 0 ||
                orderMutation.isPending ||
                preferenceMutation.isPending ||
                orderState !== "Cart"
              }
              className="px-6 py-2 bg-primary hover:bg-primaryHover text-white rounded-[10px]"
            >
              {orderMutation.isPending || preferenceMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin inline mr-2" /> Procesando...
                </>
              ) : (
                "Pagar ahora"
              )}
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={errorDialog.isOpen}
        onOpenChange={(open) =>
          setErrorDialog((prev) => ({ ...prev, isOpen: open }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              {errorDialog.title}
            </DialogTitle>
            <DialogDescription>{errorDialog.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="text-white"
              onClick={() =>
                setErrorDialog((prev) => ({ ...prev, isOpen: false }))
              }
            >
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
