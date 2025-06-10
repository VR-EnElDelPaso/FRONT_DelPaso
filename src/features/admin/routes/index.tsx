import AdminHome from "@/pages/admin/AdminHome";
import AdminMuseums from "@/pages/admin/AdminMuseums";
import AdminTours from "@/pages/admin/AdminTours";
import LandingPage from "@/pages/admin/LandingPage";
import AdminFaqs from "@/pages/admin/AdminFaqs";

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
      element: <div>Admin Acreditations Page</div>, // Placeholder for Acreditations page
    }
  ],
};

export default adminRoutes;
