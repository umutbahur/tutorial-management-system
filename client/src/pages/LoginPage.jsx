import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passVisible, setPassVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password); // AuthContext handles token storage
      navigate("/"); // redirect to home/tutorials
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex justify-between items-center border rounded relative">
            <input
              type={passVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Icon with tooltip */}
            <div className="p-2 text-gray-400 relative group cursor-pointer select-none"
              onClick={() => setPassVisible(!passVisible)}>
              {passVisible ? <EyeOff /> : <Eye />}

              {/* Tooltip */}
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-3">
                {passVisible ? "Hide password" : "Show password"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
