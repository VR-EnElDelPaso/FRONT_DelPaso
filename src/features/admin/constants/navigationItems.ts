import { Home, User, ChartBar, Layout, HelpCircle } from "lucide-react";
import { MdOutlineMuseum, MdTour } from "react-icons/md";

export const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/admin",
  },
  {
    title: "Usuarios",
    icon: User,
    url: "/admin/users",
  },
  {
    title: "Museos",
    icon: MdOutlineMuseum,
    url: "/admin/museums",
  },
  {
    title: "Recorridos",
    icon: MdTour,
    url: "/admin/tours",
  },
  {
    title: "Landing",
    icon: Layout,
    url: "/admin/landing",
  },
  {
    title: "FAQs",
    icon: HelpCircle,
    url: "/admin/faqs",
  },
  {
    title: "Estadísticas",
    icon: ChartBar,
    url: "/admin/stats",
  },
];
