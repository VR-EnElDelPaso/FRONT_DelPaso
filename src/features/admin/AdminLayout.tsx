import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./components/Sidebar";


const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex w-full m-6">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
