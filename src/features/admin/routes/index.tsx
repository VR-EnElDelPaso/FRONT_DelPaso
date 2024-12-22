import AdminHome from "@/features/admin/pages/AdminHome";
import AdminUsers from "@/features/admin/pages/AdminUsers";
import AdminMuseums from "../pages/AdminMuseums";
import AdminStats from "../pages/AdminStats";

const adminRoutes = {
  children: [
    { path: "", element: <AdminHome /> },
    { path: "users", element: <AdminUsers /> },
    { path: "museums", element: <AdminMuseums /> },
    { path: "stats", element: <AdminStats /> },
  ],
};

export default adminRoutes;