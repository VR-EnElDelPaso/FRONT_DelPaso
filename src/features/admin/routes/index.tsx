import AdminHome from "@/pages/admin/AdminHome";
import AdminMuseums from "@/pages/admin/AdminMuseums";
import AdminStatistics from "@/pages/admin/AdminStats";
import AdminTours from "@/pages/admin/AdminTours";
import AdminUsers from "@/pages/admin/AdminUsers";
import LandingPage from "@/pages/admin/LandingPage";
import AdminFaqs from "@/pages/admin/AdminFaqs";

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
    },
    {
      path: "/admin/landing",
      element: <LandingPage />,
    },
    {
      path: "/admin/faqs",
      element: <AdminFaqs />,
    },
  ],
};

export default adminRoutes;
