import { Home, User, ChartBar } from "lucide-react";
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
    title: "Estadísticas",
    icon: ChartBar,
    url: "/admin/stats",
  },
];