import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getTours } from "../services/Tour";
import { Tour } from "../shared/types/Tour";
import { MdOutlineCancel } from "react-icons/md";
import Skeleton from "../shared/components/Skeleton";
import { useCartStore } from "../stores/useCartStore";
import { useAuth } from "../hooks/useAuth";
import { createOneOrder } from "@/services/Orders";
import { createOnePreference } from "@/services/Preference";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems } = useCartStore();
  const { isAuthenticated } = useAuth();
  const [isLoadingPreference, setIsLoadingPreference] = useState<boolean>(false);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isToursLoading, setIsToursLoading] = useState<boolean>(true);

  // Obtener los IDs de tours del carrito
  const tourIds = useMemo(() => {
    return cartItems.filter((item) => item.isSelected).map((item) => item.id);
  }, [cartItems]);

  const fetchTours = useCallback(async () => {
    if (!tourIds || tourIds.length === 0) {
      setIsToursLoading(false);
      return;
    }

    const response = await getTours(tourIds);
    if (!response.ok) {
      setIsToursLoading(false);
      return;
    }

    setTours(response.data as Tour[]);
    setIsToursLoading(false);
  }, [tourIds]);

  const handlePay = useCallback(async () => {
    setIsLoadingPreference(true);
    try {
      const order = await createOneOrder(tourIds);
      if (!order.data?.id) return;
      const preference = await createOnePreference(order.data.id);
      if (!preference.data?.init_point) return;
      window.location.href = preference.data.init_point;
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsLoadingPreference(false);
    }
  }, [tourIds]);

  const total = useMemo(() => {
    return tours
      .reduce((acc, tour) => {
        if (tour) {
          return acc + Number(tour.price);
        }
        return acc;
      }, 0)
      .toFixed(2);
  }, [tours]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  // Si no hay tours seleccionados, redirigir a /cart
  useEffect(() => {
    if (!isToursLoading && tours.length === 0) {
      navigate("/cart");
    }
  }, [isToursLoading, tours.length, navigate]);

  // Validación de autenticación y carrito
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: location }, replace: true });
      return;
    }

    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }
  }, [isAuthenticated, cartItems.length, navigate]);

  // Si no hay items en el carrito, redirigir a /cart
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }
  }, [cartItems.length, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold">Resumen de Compra</h2>
        </div>
        <div className="p-6">
          {/* Items list */}
          {isToursLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} paragraphRows={3} active paragraph />
              ))
            : tours.map((tour) => <CheckoutItem key={tour.id} tour={tour} />)}

          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-sm mb-2">Total a pagar:</p>
            <p className="font-bold text-3xl text-blue-600">${total}</p>
          </div>
          <div className="mt-6">
            <Button
              className="w-full text-white"
              onClick={handlePay}
              disabled={isToursLoading}
            >
              {isLoadingPreference && <Loader2 className="animate-spin" />}
              Pagar
            </Button>
            {/* Back button */}
            <button
              onClick={() => navigate("/cart", { replace: true })}
              className="flex justify-center items-center gap-2 text-red-600 w-full mt-6 py-2 border border-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300"
            >
              <MdOutlineCancel className="text-xl" /> Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutItem({ tour }: { tour: Tour }) {
  return (
    <>
      <div className="mb-4">
        <p className="text-gray-600 text-sm">Tour:</p>
        <p className="font-bold text-xl text-gray-800">{tour.name}</p>
      </div>
      <div>
        <p className="text-gray-600 text-sm">Precio:</p>
        <p className="font-bold text-2xl text-blue-600">${tour.price}</p>
      </div>
      <hr className="my-2 bg-gray-400" />
    </>
  );
}
