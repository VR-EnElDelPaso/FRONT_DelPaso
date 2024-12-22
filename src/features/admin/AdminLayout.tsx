import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-lg font-bold">Admin Panel</div>
        <nav className="flex flex-col space-y-2">
          <a href="/admin" className="px-4 py-2 hover:bg-gray-700">Dashboard</a>
          <a href="/admin/manage-users" className="px-4 py-2 hover:bg-gray-700">Gestión de Usuarios</a>
          <a href="/admin/reports" className="px-4 py-2 hover:bg-gray-700">Reportes</a>
          <a href="/admin/settings" className="px-4 py-2 hover:bg-gray-700">Configuraciones</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <button className="text-red-600 hover:text-red-800">Logout</button>
        </header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
