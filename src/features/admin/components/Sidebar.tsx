import { Link, useLocation } from "react-router-dom";
import { Home, User, ChartBar, LogOut } from "lucide-react";
import { MdOutlineMuseum } from "react-icons/md";
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import Muvi from "@/assets/images/muvi.jpg";
import { useAuth } from "@/hooks/useAuth";

const navigationItems = [
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
    title: "Estadísticas",
    icon: ChartBar,
    url: "/admin/stats",
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActiveRoute = (url: string) => {
    if (url === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }

    return location.pathname.includes(url);
  }

  const handleLogout = () => logout();

  return (
    <Sidebar className="w-60 h-screen bg-white border-r border-gray-100">
      <SidebarContent className="flex flex-col h-full">
        <SidebarHeader className="p-6">
          <img 
            src={Muvi} 
            alt="Muvi logo" 
            className="w-20 h-20 rounded-full object-cover mx-auto shadow-sm"
          />
        </SidebarHeader>

        <SidebarGroup className="flex-1 px-3 py-8">
          <SidebarMenu>
            {navigationItems.map((item, index) => (
              <SidebarMenuItem key={index} className="mb-2">
                <SidebarMenuButton asChild>
                  <Link 
                    to={item.url} 
                    className={`flex items-center px-4 py-2.5 rounded-lg transition-all group
                      ${isActiveRoute(item.url)
                        ? 'bg-gray-50 text-gray-900' 
                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <item.icon className={`w-[18px] h-[18px] ${isActiveRoute(item.url) ? 'opacity-100' : 'opacity-60'}`} />
                    <span className="ml-3 text-sm font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarFooter className="p-4">
          <button 
            className="flex items-center w-full px-4 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
            onClick={handleLogout}
          >
            <LogOut className="w-[18px] h-[18px] opacity-75" />
            <span className="ml-3 font-medium">Salir</span>
          </button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;