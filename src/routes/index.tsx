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
import AdminProtectedRoute from "@/features/admin/components/AdminProtectedRoute";
import AdminLayout from "@/features/admin/AdminLayout";
import adminRoutes from "@/features/admin/routes";
import { ErrorBoundary } from "@/components/Errors/ErrorBoundary";
import MuseumPage from "@/pages/MuseumPage";

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
    children: [ ...adminRoutes.children ],
    hasErrorBoundary: true,
    ErrorBoundary: ErrorBoundary
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
        path: "/museum/:id",
        element: <MuseumPage />
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
    hasErrorBoundary: true,
    ErrorBoundary: ErrorBoundary
  },
]);

export default router;
