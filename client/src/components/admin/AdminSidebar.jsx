import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar({ collapsed: defaultCollapsed = false, onClose }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/admin" },
    { name: "Users", icon: <Users size={18} />, path: "/admin/users" },
    { name: "Tutorials", icon: <FileText size={18} />, path: "/admin/tutorials" },
    { name: "Settings", icon: <Settings size={18} />, path: "/admin/settings" },
  ];

  return (
    <div
      className={`flex flex-col bg-white border-r h-full transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } md:relative md:z-auto fixed z-50 inset-y-0 left-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <h1 className="text-lg font-bold text-blue-600 tracking-tight">
            Admin Panel
          </h1>
        )}
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <X size={20} className="text-gray-600" />
            </button>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {collapsed ? (
              <ChevronRight size={20} className="text-gray-600" />
            ) : (
              <ChevronLeft size={20} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
            onClick={onClose}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t p-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full text-sm text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
