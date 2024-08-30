import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Tour from "../views/Tour";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../views/Login";

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
        path: "/test",
        element: <div>Test</div>
      },
      {
        path: "/login",
        element: <HomePage/>
      },
    ]
  },
]);

export default router;