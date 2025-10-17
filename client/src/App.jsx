import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MyTutorials from "./pages/MyTutorials";
import TutorialForm from "./pages/TutorialForm";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TutorialsPage from "./pages/TutorialsPage";
import TutorialDetail from "./pages/TutorialDetail";


// 🆕 Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageTutorials from "./pages/admin/ManageTutorials";

import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        {<Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Tutorials */}
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/tutorials/my" element={
            <ProtectedRoute roles={['admin', 'user']}>
              {<MyTutorials />}
            </ProtectedRoute>
          } />

          <Route path="/tutorials/new" element={
            <ProtectedRoute roles={['admin', 'user']}>
              {<TutorialForm />}
            </ProtectedRoute>
          } />

          <Route path="/tutorials/:id" element={<TutorialDetail />} />

          {/* 🧑‍💼 ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="users" element={<ManageUsers />} />
            <Route path="tutorials" element={<ManageTutorials />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
