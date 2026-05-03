import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar"; // ✅ FIXED (no braces)
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* 🔥 Navbar ALWAYS visible when app runs */}
      <Navbar />

      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleRedirect user={user} />
            </ProtectedRoute>
          }
        />

        {/* fallback paths*/}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}


function RoleRedirect({ user }) {
  if (!user) return <Navigate to="/login" />;

  return user.role === "ADMIN"
    ? <AdminDashboard />
    : <AgentDashboard />;
}

export default App;