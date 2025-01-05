import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarCustomTrigger } from "@/components/ui/sidebar/custom-trigger";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdminSidebar from "./components/Sidebar";
import { useAuth } from "@/hooks/useAuth";

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full font-inter">
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b bg-white dark:bg-gray-900 w-full">
            <div className="flex items-center flex-1 gap-4">
              <SidebarCustomTrigger />
              <div className="relative max-w-xl w-full hidden md:block">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar museos, tours, estadísticas..."
                  className="pl-8 w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-6">
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden sm:flex"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 h-auto py-2"
                  >
                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                      <AvatarImage />
                      <AvatarFallback>
                        {user?.display_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start sm:flex">
                      <span className="text-sm font-semibold leading-tight">
                        {user?.display_name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Administrador
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configuración</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950 hover:cursor-pointer"
                    onClick={() => logout()}
                  >
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto w-full bg-gray-50 dark:bg-gray-800">
            <div className="p-2 max-w-[2000px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
