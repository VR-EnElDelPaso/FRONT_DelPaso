import { useQuery } from "@tanstack/react-query";
import { getOneOrderById } from "@/services/orders.services";
import { Tour } from "@/shared/types/Tour";
import axios from "axios";
import { getAuthConfig } from "@/services/preference.services";
import { ResponseDataTyped } from "@/shared/types/response-data.types";

export interface Order {
  id: string;
  total: number;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  canceled_at: string;
  tours: Tour[];
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const ORDERS_QUERY_KEY = "orders";

// Service para obtener órdenes por usuario
export const getOrdersByUser = async (
  userId: string
): Promise<ResponseDataTyped<Order[]>> => {
  const response = await axios.get<ResponseDataTyped<Order[]>>(
    `${BASE_URL}/orders/by-user/${userId}`,
    getAuthConfig()
  );
  return response.data;
};

// Query para obtener todas las órdenes del usuario autenticado
export const useFetchUserOrders = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, "by-user", userId],
    queryFn: () => getOrdersByUser(userId),
    enabled: !!userId && enabled,
  });
};

// Query para obtener una orden específica por ID
export const useFetchOrderById = (orderId: string, enabled = true) => {
  return useQuery({
    queryKey: [ORDERS_QUERY_KEY, "by-id", orderId],
    queryFn: () => getOneOrderById(orderId),
    enabled: !!orderId && enabled,
  });
};
