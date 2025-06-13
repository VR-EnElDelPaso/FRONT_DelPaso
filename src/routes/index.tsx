import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import HomePage from "../pages/HomePage";
import TourPage from "../pages/TourPage";
import AppLayout from "../layouts/AppLayout";
import Tours from "../pages/Tours";
import CartPage from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import Auth from "@/pages/Auth";
import AdminProtectedRoute from "@/features/admin/components/AdminProtectedRoute";
import AdminLayout from "@/features/admin/AdminLayout";
import adminRoutes from "@/features/admin/routes";
import { ErrorBoundary } from "@/components/Errors/ErrorBoundary";
import MuseumPage from "@/pages/MuseumPage";
import { OrderDetailPage } from "@/pages/OrderDetailPage";
import FaqsPage from "@/pages/FaqsPage";
import MyPurchasesPage from "@/pages/MyPurchasesPage";
import { VerifyEmailPage } from "@/pages/VerifyEmailPage";
import AboutPage from "@/pages/AboutPage";
import NoFooterLayout from "@/layouts/NoFooterLayout";
import { SeeTourPage } from "@/pages/SeeTourPage";
import UserProfilePage from "@/pages/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <NoFooterLayout />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
      {
        path: "verify-email/:token",
        element: <VerifyEmailPage />,
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
    children: [...adminRoutes.children],
    hasErrorBoundary: true,
    ErrorBoundary: ErrorBoundary,
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
        path: "/my-purchases",
        element: (
          <ProtectedRoute>
            <MyPurchasesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile", // Nueva ruta protegida
        element: (
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tours",
        children: [
          {
            index: true,
            element: <Tours />,
          },
          {
            path: ":id",
            element: <TourPage />,
          },
          {
            path: "view/:id",
            element: <SeeTourPage />,
          },
        ],
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/faqs",
        element: <FaqsPage />,
      },
      {
        path: "/museum/:id",
        element: <MuseumPage />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetailPage />,
      },
    ],
    hasErrorBoundary: true,
    ErrorBoundary: ErrorBoundary,
  },
]);

export default router;
