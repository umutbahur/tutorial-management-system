import { useState, useEffect, createContext, useContext } from "react";
import api from "../services/api";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // 🔹 Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/users/login", { email, password });
      console.log(res);
      const { token: userToken, user: userData } = res.data;

      
      setToken(userToken);
      setUser(userData);

      localStorage.setItem("token", userToken);
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (err) {
      console.log(err);
      throw err.response?.data?.message || "Login failed";
    }
  };

  // 🔹 Register
  const register = async (username, email, password) => {
    try {
      const res = await api.post("/users/register", { username, email, password });
      const { token: userToken, user: userData } = res.data;

      setToken(userToken);
      setUser(userData);

      localStorage.setItem("token", userToken);
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (err) {
      throw err.response?.data?.message || "Registration failed";
    }
  };

  // 🔹 Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // 🔹 Load user on refresh
  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser && savedUser !== "undefined") {
    try {
      setUser(JSON.parse(savedUser));
    } catch {
      console.warn("Corrupted user data in localStorage — clearing it.");
      localStorage.removeItem("user");
      setUser(null);
    }
  }
}, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
