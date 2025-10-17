import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  // 1️⃣ Still loading (undefined means not initialized yet)
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  // 2️⃣ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Role check
  if (roles && (!user.role || !roles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  // 4️⃣ Access granted
  return children;
};

export default ProtectedRoute;
