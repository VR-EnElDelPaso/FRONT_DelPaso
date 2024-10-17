import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/Home";
import TourPage from "../pages/TourPage";
import LoginPage from "../pages/Login";
import AppLayout from "../layouts/AppLayout";
import Tours from "../pages/Tours";
import CartPage from "../pages/CartPage";
import { CheckoutPage } from "../pages/Checkout";
import TourRoutePage from "../pages/TourRoutePage";

const router = createBrowserRouter([
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
        element: <CheckoutPage />,
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
        path: "/tour-route",
        element: <TourRoutePage />,
      },
    ],
  },
]);

export default router;
