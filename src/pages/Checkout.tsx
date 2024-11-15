import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPreferences } from "../services/Preference";
import { Wallet } from "@mercadopago/sdk-react";
import { getTours } from "../services/Tour";
import { Tour } from "../shared/types/Tour";
import { MdOutlineCancel } from "react-icons/md";
import Skeleton from "../shared/components/Skeleton";
import { useCartStore } from "../stores/useCartStore";

export function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCartStore();
  const [isLoadingPreference, setIsLoadingPreference] = useState<boolean>(true);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isToursLoading, setIsToursLoading] = useState<boolean>(true);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  // Si no hay items en el carrito, redirigir a /cart
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }
  }, [cartItems.length, navigate]);

  // Obtener los IDs de tours del estado o del carrito
  const tourIds = useMemo(() => {
    if (state?.tourIds) {
      return state.tourIds;
    }
    return cartItems.filter((item) => item.isSelected).map((item) => item.id);
  }, [state, cartItems]);

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

    setTours(response.data);
    setIsToursLoading(false);
  }, [tourIds]);

  const createPreference = useCallback(async () => {
    setIsLoadingPreference(true);

    if (!tourIds || tourIds.length === 0) {
      setIsLoadingPreference(false);
      return;
    }

    const response = await createPreferences(tourIds);
    if (response.ok) {
      setPreferenceId(response.data);
    }
    setIsLoadingPreference(false);
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

  useEffect(() => {
    createPreference();
  }, [createPreference]);

  // Si no hay tours seleccionados, redirigir a /cart
  useEffect(() => {
    if (!isToursLoading && tours.length === 0) {
      navigate("/cart");
    }
  }, [isToursLoading, tours.length, navigate]);

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
          {!isLoadingPreference ? (
            <div className="mt-6">
              <Wallet initialization={{ preferenceId: preferenceId! }} />
              {/* Back button */}
              <button
                onClick={() => navigate("/cart", { replace: true })}
                className="flex justify-center items-center gap-2 text-red-600 w-full mt-6 py-2 border border-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300"
              >
                <MdOutlineCancel className="text-xl" /> Cancelar
              </button>
            </div>
          ) : (
            <div className="mt-6 text-center">
              <Skeleton title={false} paragraphRows={2} />
            </div>
          )}
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
