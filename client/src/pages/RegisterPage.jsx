import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PasswordStrength from "../components/PasswordStrength";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.username, form.email, form.password);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <div className="flex justify-between items-center border rounded relative">
          <input
            type={passVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-2 w-full "
            required
            minLength={8}
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
        {/* Password Strength Component */}
        <PasswordStrength password={form.password} />

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
