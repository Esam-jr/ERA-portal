import React from "react";
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import SubmitFeedback from "./pages/SubmitFeedback.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/submit" || location.pathname.startsWith("/admin");
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/submit" element={<SubmitFeedback />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<p className="text-center text-5xl">404 Not Found</p>}
        />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: { background: "#10b981", color: "#fff" },
          },
          error: {
            style: { background: "#ef4444", color: "#fff" },
          },
        }}
      />
    </>
  );
}

export default App;
