import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { admin, setAdmin, loading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && admin) {
      console.log("🔄 Already authenticated, redirecting to dashboard");
      navigate("/admin/dashboard", { replace: true });
    }
  }, [admin, authLoading, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        // Update auth context immediately so ProtectedRoute sees authenticated state
        if (res.data.admin) {
          setAdmin(res.data.admin);
        }
        toast.success(res.data.message);
        navigate("/admin/dashboard", { replace: true });
        console.log("✅ Login success response:", res.data);
      } else {
        toast.error(res.data.error || "Login failed");
      }
    } catch (err) {
      const serverMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Login failed";

      toast.error(serverMsg);
      console.error("❌ Login error response:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-16 w-16" />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-black transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 px-4 py-2 rounded-lg border border-blue-600 text-white bg-blue-500 font-medium hover:bg-blue-700 transition"
        >
          Go back to Home
        </button>
      </div>
    </main>
  );
}
