import { useCallback, useEffect, useMemo, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { getTours, checkPurchasedTours } from "../features/tour/tour.services";
import { Tour } from "../shared/types/Tour";
import { CartSuggestions } from "../features/cart/components/CartSuggestions";
import { CartList } from "../features/cart/components/CartList";
import { CartResume } from "../features/cart/components/CartResume";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EmptyCartMessage } from "@/features/cart/components/EmptyCartMessage";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function CartPage() {
  // ----[ State ]----
  const [fetchedTours, setFetchedTours] = useState<Tour[]>([]);

  // ----[ Hooks ]----
  const [searchParams] = useSearchParams();
  const { cartItems, setCartItem, removeCartItem } = useCartStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // ----[ Memos ]----
  const toursIds = useMemo(() => cartItems.map((item) => item.id), [cartItems]);

  const cartListData = useMemo(
    () =>
      fetchedTours.map((tour) => ({
        ...tour,
        isSelected: cartItems.some(
          (item) => item.id === tour.id && item.isSelected
        ),
      })),
    [fetchedTours, cartItems]
  );

  // ----[ Callbacks ]----
  const fetchTours = useCallback(async () => {
    if (toursIds.length === 0) return;

    const response = await getTours(toursIds);
    if (!response.ok) return;

    const fetchedTours = response.data;
    setFetchedTours(fetchedTours);

    // Check for ghost items and remove them
    const fetchedTourIds = fetchedTours.map((tour: Tour) => tour.id);
    const ghostItemIds = toursIds.filter((id) => !fetchedTourIds.includes(id));

    if (ghostItemIds.length > 0) {
      // Remove each ghost item from the cart
      ghostItemIds.forEach((id) => {
        removeCartItem(id);
      });

      // Show a toast notification to inform the user
      toast({
        title: "Carrito actualizado",
        description: `Se han eliminado ${ghostItemIds.length} tour(s) que ya no están disponibles.`,
        variant: "default",
      });
    }

    // También verificar tours con compras activas si el usuario está autenticado
    if (isAuthenticated) {
      const purchasedToursResponse = await checkPurchasedTours(fetchedTourIds);

      if (
        purchasedToursResponse?.ok &&
        (purchasedToursResponse.data ?? []).length > 0
      ) {
        const activePurchasedTourIds = purchasedToursResponse.data;

        // Eliminar solo los tours con compras activas del carrito
        (activePurchasedTourIds ?? []).forEach((id: string) => {
          removeCartItem(id);
        });

        // Notificar al usuario
        toast({
          title: "Carrito actualizado",
          description: `Se ${
            activePurchasedTourIds?.length === 1 ? "ha" : "han"
          } eliminado ${activePurchasedTourIds?.length} tour${
            activePurchasedTourIds?.length === 1 ? "" : "s"
          } que ya ${
            activePurchasedTourIds?.length === 1 ? "tiene" : "tienen"
          } acceso activo.`,
          variant: "default",
        });
      }
    }
  }, [toursIds, removeCartItem, toast, isAuthenticated]);

  // ----[ Effects ]----
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  useEffect(() => {
    if (searchParams.has("external_reference")) {
      navigate(`/orders/${searchParams.get("external_reference")}`);
    }
  }, [navigate, searchParams]);

  // ----[ Functions ]----
  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    setCartItem({ ...item, isSelected: isChecked });
  };

  const selectAllItems = () => {
    cartItems.forEach((item) => {
      setCartItem({ ...item, isSelected: true });
    });
  };

  const unselectAllItems = () => {
    cartItems.forEach((item) => {
      setCartItem({ ...item, isSelected: false });
    });
  };

  const handlePay = () => {
    const selectedItems = cartItems
      .filter((item) => item.isSelected)
      .map((item) => item.id);

    if (selectedItems.length === 0) {
      toast({
        title: "No hay tours seleccionados",
        description: "Por favor, selecciona al menos un tour para continuar.",
        variant: "destructive",
      });
      return;
    }

    navigate("/checkout", {
      state: { tourIds: selectedItems },
      replace: true,
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4">
          {/* Main Cart Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-kaiseiDecol">
                Carrito
              </h1>

              {cartItems.length > 0 && (
                <div className="mt-4 sm:mt-6 flex items-center justify-between">
                  <div className="flex gap-4 text-primary hover:text-primary/90">
                    <button
                      type="button"
                      onClick={selectAllItems}
                      className="text-sm sm:text-base hover:drop-shadow-lg"
                    >
                      Seleccionar todos
                    </button>
                    <button
                      type="button"
                      onClick={unselectAllItems}
                      className="text-sm sm:text-base hover:drop-shadow-lg"
                    >
                      Borrar selección
                    </button>
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base max-[490px]:hidden">
                    Cuota de recuperación
                  </div>
                </div>
              )}

              <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-4" />

              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <EmptyCartMessage />
                ) : (
                  <CartList
                    cartItems={cartListData}
                    onCheckboxChange={handleCheckboxChange}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-4">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <CartResume cartItems={cartListData} onPay={handlePay} />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <CartSuggestions cartListData={cartListData} quantity={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
