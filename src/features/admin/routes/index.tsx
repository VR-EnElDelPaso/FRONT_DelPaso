import AdminHome from "@/features/admin/pages/AdminHome";
import AdminUsers from "@/features/admin/pages/AdminUsers";
import AdminMuseums from "../pages/AdminMuseums";
import AdminStats from "../pages/AdminStats";
import AdminTours from "../pages/AdminTours";
import { getAllMuseums } from "@/services/Museums";
import { getAllTours } from "@/services/Tour";

const adminRoutes = {
  children: [
    { path: "", element: <AdminHome /> },
    { path: "users", element: <AdminUsers /> },
    {
      path: "museums",
      element: <AdminMuseums />,
      loader: async () => await getAllMuseums(),
    },
    { path: "stats", element: <AdminStats /> },
    {
      path: "tours",
      element: <AdminTours />,
      loader: async () => await getAllTours(),
    },
  ],
};

export default adminRoutes;
