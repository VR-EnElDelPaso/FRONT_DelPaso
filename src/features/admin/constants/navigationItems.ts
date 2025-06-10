import { Home, Layout, HelpCircle } from "lucide-react";
import { MdOutlineMuseum, MdTour } from "react-icons/md";

export const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/admin",
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
    title: "acreditaciones",
    icon: null,
    imageSrc: "/assets/shared/images/acreditable-icon.png",
    url: "/admin/accreditations",
  },
  {
    title: "FAQs",
    icon: HelpCircle,
    url: "/admin/faqs",
  },
];
