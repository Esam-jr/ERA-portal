import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  console.log("🔒 ProtectedRoute - loading:", loading, "admin:", admin);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!admin) {
    console.log("🔒 ProtectedRoute - No admin, redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  console.log("🔒 ProtectedRoute - Admin authenticated, rendering children");
  return children;
}
