import { useAuth } from "@/hooks/useAuth";
import { useFetchUserOrders, type Order } from "@/features/orders/orders.querys";
import Loader from "@/shared/components/Loader";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Package, CreditCard, Eye, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";

// Función helper para obtener el color del status
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "canceled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Función helper para traducir el status
const getStatusText = (status: string, t: (key: string) => string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return t("Completed");
    case "pending":
      return t("Pending");
    case "canceled":
      return t("Canceled");
    default:
      return status;
  }
};

// Componente para mostrar una orden individual
const OrderCard = ({ order }: { order: Order }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/orders/${order.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            {t("Order")} #{order.id.slice(-8)}
          </CardTitle>
          <Badge className={getStatusColor(order.status)}>
            {getStatusText(order.status, t)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Información de la orden */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              {dateFormatter(order.created_at)} a las{" "}
              {timeFormatter(order.created_at)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span className="font-semibold">${order.total}</span>
          </div>
        </div>

        {/* Tours incluidos */}
        <div>
          <h4 className="font-semibold mb-2 text-sm text-gray-700">
            {t("Tours included")} ({order.tours.length})
          </h4>
          <div className="space-y-2">
            {order.tours.slice(0, 2).map((tour) => (
              <div
                key={tour.id}
                className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
              >
                {tour.image_url && (
                  <img
                    src={tour.image_url}
                    alt={tour.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {tour.name}
                  </p>
                  <p className="text-xs text-gray-600">${tour.price}</p>
                </div>
              </div>
            ))}
            {order.tours.length > 2 && (
              <p className="text-xs text-gray-500 pl-2">
                {t("And {{count}} more...", { count: order.tours.length - 2 })}
              </p>
            )}
          </div>
        </div>

        {/* Botón para ver detalles */}
        <Button
          onClick={handleViewDetails}
          variant="outline"
          className="w-full mt-4"
        >
          <Eye className="h-4 w-4 mr-2" />
          {t("View Details")}
        </Button>
      </CardContent>
    </Card>
  );
};

// Componente principal de la página
const MyPurchasesPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    data: ordersResponse,
    isLoading,
    error,
  } = useFetchUserOrders(user?.id || "", !!user?.id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t("Error")}
          </h1>
          <p className="text-gray-600">
            {t("There was an error loading your purchases")}
          </p>
        </div>
      </div>
    );
  }

  const orders = ordersResponse?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          {t("My Purchases")}
        </h1>
        <p className="text-gray-600">
          {t("Here you can see all your tour purchases and their status")}
        </p>
      </div>

      {/* Lista de órdenes */}
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {t("No purchases yet")}
          </h2>
          <p className="text-gray-500 mb-6">
            {t("When you make your first purchase, it will appear here")}
          </p>
          <Button
            onClick={() => (navigate("/tours"))}
            className="text-white"
          >
            {t("Explore Tours")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchasesPage;
