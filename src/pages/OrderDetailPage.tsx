import { getOneOrderById, PostOrderResponse } from "@/services/orders.services";
import Loader from "@/shared/components/Loader";
import NotFound from "@/shared/components/NotFound";
import Skeleton from "@/shared/components/Skeleton";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type OrderStatus = "PENDING" | "COMPLETED" | "CANCELED";

const humanizeStatus = (status?: OrderStatus) => {
  if (!status) return "Desconocido";
  const humanizedStatus: Record<OrderStatus, string> = {
    PENDING: "Pendiente",
    COMPLETED: "Completada",
    CANCELED: "Cancelada",
  };
  return humanizedStatus[status] ?? "Desconocido";
};

const humanizeDays: Record<number,string> = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

const humanizeMonths: Record<number,string> = {
  0: "Enero",
  1: "Febrero",
  2: "Marzo",
  3: "Abril",
  4: "Mayo",
  5: "Junio",
  6: "Julio",
  7: "Agosto",
  8: "Septiembre",
  9: "Octubre",
  10: "Noviembre",
  11: "Diciembre"
};

const humanizeDate = (date?: Date) => {
  if (!date) return "Desconocido";
  const dayName = humanizeDays[date.getDay()];
  const monthName = humanizeMonths[date.getMonth()];
  return `${dayName} ${date.getDate()} de ${monthName} de ${date.getFullYear()}`;
}

const getStatusColor = (status?: OrderStatus) => {
  if (!status) return "bg-gray-400";
  const statusColors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-400",
    COMPLETED: "bg-green-400",
    CANCELED: "bg-red-400",
  };
  return statusColors[status] ?? "bg-gray-400";
};

export const OrderDetailPage = () => {
  // ----[ State ]----
  const [order, setOrder] = useState<PostOrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  // ----[ Hooks ]----
  const { orderId } = useParams();
  const navigate = useNavigate();

  const date = new Date();
  date.getDate();
  date.getMonth();
  date.getFullYear();

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

  // ----[ Handlers ]----
  const handleTourClick = (tourId: string) => {
    navigate(`/tours/${tourId}`);
  };

  // ----[ Effects ]----
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) return <Loader />;

  if (errorMessage) return <NotFound />;

  return (
    <>
      <div className="min-h-screen px-4 py-8 bg-gray-100">
        <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
          <div className="flex justify-between mb-8 align-center">
            <div className="flex flex-col space-y-1">
              <h1 className="text-4xl font-medium text-gray-800 font-kaiseiDecol">
                Detalle de orden
              </h1>
              <p>
                {order?.created_at ? humanizeDate(new Date(order.created_at)) : "Desconocido"}
              </p>
            </div>
            <div
              className={`flex items-center px-4 py-1 my-auto rounded-lg text-white ${getStatusColor(
                order?.status as OrderStatus
              )}`}
            >
              {humanizeStatus(order?.status as OrderStatus)}
            </div>
          </div>

          {!order?.tours ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} paragraphRows={1} active paragraph />
              ))}
            </div>
          ) : (
            <div>
              {order?.tours.map((tour) => (
                <div key={tour.id} className="p-4 mb-4 border-2 rounded-lg">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                    <div className="md:col-span-4">
                      <div className="mb-1 text-gray-600">Recorrido</div>
                      <div className="overflow-hidden font-medium break-words hyphens-auto">
                        {tour.name}
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <div className="mb-1 text-gray-600">Autor</div>
                      <div className="font-medium">Emilio Rosado</div>
                    </div>
                    <div className="md:col-span-3">
                      <div className="mb-1 text-gray-600">
                        Cuota de Recuperación
                      </div>
                      <div className="font-medium">
                        ${Number(tour.price).toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-2 md:col-span-2 md:mt-0">
                      <button
                        onClick={() => handleTourClick(tour.id)}
                        className="text-primary hover:text-primary/90 hover:underline"
                      >
                        Ver recorrido
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="my-6 border-t"></div>

          <div className="flex justify-end mb-6">
            <div className="text-right">
              <div className="mb-1 text-gray-600">Total</div>
              <div className="text-2xl font-bold">${order?.total}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
