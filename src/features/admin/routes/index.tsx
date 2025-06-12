import AdminHome from "@/pages/admin/AdminHome";
import AdminMuseums from "@/pages/admin/AdminMuseums";
import AdminTours from "@/pages/admin/AdminTours";
import LandingPage from "@/pages/admin/LandingPage";
import AdminFaqs from "@/pages/admin/AdminFaqs";
import { AdminAccreditationsPage } from "@/pages/admin/AdminAccreditationsPage";

const adminRoutes = {
  children: [
    { path: "", element: <AdminHome /> },
    {
      path: "museums",
      element: <AdminMuseums />,
    },
    {
      path: "tours",
      element: <AdminTours />,
    },
    {
      path: "landing",
      element: <LandingPage />,
    },
    {
      path: "faqs",
      element: <AdminFaqs />,
    },
    {
      path: "accreditations",
      element: <AdminAccreditationsPage />,
    }
  ],
};

export default adminRoutes;
