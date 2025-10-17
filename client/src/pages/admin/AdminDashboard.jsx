import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex">
        <AdminSidebar collapsed={false} />
      </div>

      {/* Sidebar drawer for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 flex lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-30" />

          {/* Drawer */}
          <div
            className="relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <AdminSidebar collapsed={false} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
