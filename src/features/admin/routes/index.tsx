import AdminHome from "@/pages/admin/AdminHome";
import AdminMuseums from "@/pages/admin/AdminMuseums";
import AdminStatistics from "@/pages/admin/AdminStats";
import AdminTours from "@/pages/admin/AdminTours";
import AdminUsers from "@/pages/admin/AdminUsers";
import { getAllTours } from "@/services/Tour";

const adminRoutes = {
  children: [
    { path: "", element: <AdminHome /> },
    { path: "users", element: <AdminUsers /> },
    {
      path: "museums",
      element: <AdminMuseums />,
    },
    { path: "stats", element: <AdminStatistics /> },
    {
      path: "tours",
      element: <AdminTours />,
      loader: async () => await getAllTours(),
    },
  ],
};

export default adminRoutes;
