import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { createPreferences } from "../services/Preference";
import { Wallet } from "@mercadopago/sdk-react";
import { getTours } from "../services/Tour";
import { Tour } from "../shared/types/Tour";
import Skeleton from "../shared/components/Skeleton";

export function CheckoutPage() {
  const { state: { tourIds } } = useLocation();
  const [isLoadingPreference, setIsLoadingPreference] = useState<boolean>(true);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isToursLoading, setIsToursLoading] = useState<boolean>(true);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const fetchTours = useCallback(async () => {
    if (!tourIds) {
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

    if (!tourIds) {
      setIsLoadingPreference(false);
      return;
    }

    const response = await createPreferences(tourIds);
    if (response.ok) {
      console.log(response.data);
      setPreferenceId(response.data);
    }
    setIsLoadingPreference(false);
  }, [tourIds]);

  const total = useMemo(() => {
    return tours.reduce((acc, tour) => {
      if (tour) {
        return acc + Number(tour.price);
      }
      return acc;
    }, 0).toFixed(2);
  }, [tours]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  useEffect(() => {
    createPreference();
  }, [createPreference]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold">Resumen de Compra</h2>
        </div>
        <div className="p-6">

          {/* Items list */}
          {isToursLoading
            ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  paragraphRows={3}
                  active
                  paragraph
                />
              ))
            )
            : (
              tours.map(tour => (
                <CheckoutItem key={tour.id} tour={tour} />
              ))
            )
          }


          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-sm mb-2">Total a pagar:</p>
            <p className="font-bold text-3xl text-blue-600">${total}</p>
          </div>
          {!isLoadingPreference
            ? (
              <div className="mt-6">
                <Wallet
                  initialization={{ preferenceId: preferenceId! }}
                />
              </div>
            )
            : (
              <div className="mt-6 text-center">
                <Skeleton title={false} paragraphRows={2}/>
              </div>
            )
          }
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
  )
}