import { getOneOrderById, PostOrderResponse } from "@/services/Orders";
import Loader from "@/shared/components/Loader";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const OrderDetailPage = () => {
  // ----[ State ]----
  const [order, setOrder] = useState<PostOrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  // ----[ Hooks ]----
  const { orderId } = useParams();
  const navigate = useNavigate();

  // ----[ Callbacks ]----
  const fetchOrder = useCallback(() => {
    setLoading(true);
    if (!orderId) {
      setErrorMessage("Error al cargar la orden");
      setLoading(false);
      return;
    }
    getOneOrderById(orderId)
      .then((response) => {
        if (response.ok) {
          setOrder(response.data ?? null);
          setErrorMessage(undefined);
        } else {
          setErrorMessage("Error al cargar la orden");
          setOrder(null);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch order:", error);
        setErrorMessage("Error al cargar la orden");
        setOrder(null);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  // ----[ Functions ]----
  const handleTourClick = (tourId: string) => {
    navigate(`/tours/${tourId}`);
  };

  // ----[ Effects ]----
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) return <Loader />;

  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl">Detalle de la orden</h1>
      estado: {order?.status}
      {order?.status === "PENDING" && (
        <>
          <p>Tu orden está pendiente de ser completada</p>
          <p>te avisaremos cuando esté lista</p>
        </>
      )}
      <br />
      <h2 className="text-xl">Tours:</h2>
      <ul className="list-disc">
        {order?.tours.map((tour) => (
          <li key={tour.id} className="ml-4">
            {tour.name}
            {order.status === "COMPLETED" && (
              <button onClick={() => handleTourClick(tour.id)} className="ml-2 bg-primary text-white px-2 py-1 rounded-md hover:bg-primary/90 transition-colors">
                Ver
              </button>
            )}
          </li>
        ))}
      </ul>
      <br />
      <p>Total: {order?.total}</p>
    </div>
  );
};
