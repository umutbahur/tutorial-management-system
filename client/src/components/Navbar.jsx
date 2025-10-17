import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar Container */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-semibold tracking-wide text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            TutorialHub
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <li>
                  <Link to="/tutorials" className="hover:text-indigo-400 transition">
                    All Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials/my" className="hover:text-indigo-400 transition">
                    My Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials/new" className="hover:text-indigo-400 transition">
                    Create
                  </Link>
                </li>

                {user.role === "admin" && (
                  <li>
                    <Link to="/admin" className="hover:text-indigo-400 transition">
                      Admin
                    </Link>
                  </li>
                )}

                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span>{user.username}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md text-sm transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/tutorials" className="hover:text-indigo-400 transition">
                    All Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-indigo-400 transition">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md text-sm font-medium transition"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Dropdown */}
      <div
        className={`md:hidden bg-gray-900 border-t border-gray-700 overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="flex flex-col p-4 space-y-3">
          {user ? (
            <>
              <li>
                <Link
                  to="/tutorials"
                  className="block hover:text-indigo-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  All Tutorials
                </Link>
              </li>
              <li>
                <Link
                  to="/tutorials/my"
                  className="block hover:text-indigo-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  My Tutorials
                </Link>
              </li>
              <li>
                <Link
                  to="/tutorials/new"
                  className="block hover:text-indigo-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Create
                </Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="block hover:text-indigo-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </li>
              )}

              <li className="flex items-center gap-2 text-gray-300 mt-3">
                <User className="w-4 h-4 text-indigo-400" />
                <span>{user.username}</span>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm mt-2 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/tutorials" className="hover:text-indigo-400 transition"
                onClick={() => setMenuOpen(false)}>
                  All Tutorials
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block hover:text-indigo-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
