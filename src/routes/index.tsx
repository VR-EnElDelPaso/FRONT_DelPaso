import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import TourPage from "../pages/Tour";
import LoginPage from "../pages/Login";
import AppLayout from "../layouts/AppLayout";

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