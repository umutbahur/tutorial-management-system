import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { BookOpen, User, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">TutorialHub</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Explore, create, and manage tutorials effortlessly.  
          Whether you’re a learner or an admin, everything starts here.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition flex items-center gap-2"
              >
                <User size={18} /> Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition flex items-center gap-2"
              >
                <Shield size={18} /> Register
              </Link>
            </>
          ) : user.role === "admin" ? (
            <Link
              to="/admin"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Shield size={18} /> Go to Admin Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/tutorials"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition flex items-center gap-2"
              >
                <BookOpen size={18} /> Browse Tutorials
              </Link>
              <Link
                to="/tutorials/my"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition flex items-center gap-2"
              >
                My Tutorials <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} TutorialHub — All rights reserved.
      </motion.footer>
    </div>
  );
}
