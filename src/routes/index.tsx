import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Tour from "../views/Tour";
import AppLayout from "../layouts/AppLayout";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/tour",
        element: <Tour />
      },
      {
        path: "/test",
        element: <div>Test</div>
      }
    ]
  },
]);

export default router;