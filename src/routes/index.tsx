import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import TourPage from "../pages/Tour";
import AppLayout from "../layouts/AppLayout";
import LoginPage from "../pages/Login";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/tour/:id",
        element: <TourPage />
      },
      {
        path: "/test",
        element: <div>Test</div>
      },
      {
        path: "/login",
        element: <LoginPage/>
      },
    ]
  },
]);

export default router;