import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Tour from "../views/Tour";
import Tours from "../views/Tours";
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
        path: "/tour/:id",
        element: <Tour />
      },
      {
        path: "/tours",
        element: <Tours />
      },
      {
        path: "/test",
        element: <div>Test</div>
      }
    ]
  },
]);

export default router;