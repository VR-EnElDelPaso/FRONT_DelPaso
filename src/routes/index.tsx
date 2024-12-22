import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";

import HomePage from "../pages/Home";
import TourPage from "../pages/TourPage";
import LoginPage from "../pages/Login";
import AppLayout from "../layouts/AppLayout";
import NoAppBarLayout from "../layouts/NoAppBarLayout";
import Tours from "../pages/Tours";
import CartPage from "../pages/CartPage";
import { CheckoutPage } from "../pages/Checkout";
import TourRoutePage from "../pages/TourRoutePage";
import Auth from "@/pages/Auth";
import AdminProtectedRoute from "@/features/admin/routes/AdminProtectedRoute";
import AdminLayout from "@/features/admin/AdminLayout";
import AdminHome from "@/features/admin/pages/AdminHome";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <NoAppBarLayout />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tour/:id",
        element: <TourPage />,
      },
      {
        path: "/tours",
        element: <Tours />,
      },
      {
        path: "/test",
        element: <div>Test</div>,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/tour-route/:id",
        element: <TourRoutePage />,
      },
    ],
  },
]);

export default router;
