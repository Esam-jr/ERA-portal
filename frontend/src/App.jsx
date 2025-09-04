import React from "react";
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import SubmitFeedback from "./pages/SubmitFeedback.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/submit" element={<SubmitFeedback />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Toaster
        position="top-right"
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
