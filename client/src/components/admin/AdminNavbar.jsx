import { Bell, Menu, UserCircle } from "lucide-react";

export default function AdminNavbar({ onMenuClick }) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-4 md:px-6 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={onMenuClick}
        >
          <Menu size={22} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-700 hidden sm:block">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-500" />
        </button>
        <div className="flex items-center gap-2">
          <UserCircle size={28} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
