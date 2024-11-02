import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPreference } from "../apis/Preferences";
import { Wallet } from "@mercadopago/sdk-react";

const Buy = () => {
  const location = useLocation();
  const { state } = location;
  const { id, name, price } = state.tour;
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await createPreference(id)
        setPreferenceId(response.data.preferenceId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPreference();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg- text-center py-4">
          <h2 className="text-2xl font-bold">Resumen de Compra</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-600 text-sm">Tour:</p>
            <p className="font-bold text-xl text-gray-800">{name}</p>
          </div>
          <div className="mb-6">
            <p className="text-gray-600 text-sm">Precio:</p>
            <p className="font-bold text-2xl text-blue-600">${price}</p>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-600 text-sm mb-2">Total a pagar:</p>
            <p className="font-bold text-3xl text-blue-600">${price}</p>
          </div>
          {preferenceId ? (
            <div className="mt-6">
              <Wallet 
                initialization={{ preferenceId: preferenceId }}
              />
            </div>
          ) : (
            <div className="mt-6 text-center">
              <p className="text-gray-600">Cargando opciones de pago...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;