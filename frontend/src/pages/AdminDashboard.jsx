// AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import ExportButtons from "../components/ExportButtons";
import FeedbackTable from "../components/FeedbackTable";
import AdminManagement from "../components/AdminManagement";
import DepartmentManagement from "../components/DepartmentManagement";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Feedbacks");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(null);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        setAdmin(response.data.user);
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
        setError("Failed to load admin information");
        window.location.href = "/admin/login";
      } finally {
        setAdminLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`/api/feedback?page=1&limit=50`, {
          withCredentials: true,
        });
        setItems(response.data.items || response.data || []);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "Feedbacks") {
      fetchFeedback();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Feedbacks":
        return (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Feedbacks Management
                {admin && (
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    (Logged in as {admin.name})
                  </span>
                )}
              </h2>
              <ExportButtons data={items} admin={admin} />
            </div>
            <FeedbackTable data={items} loading={loading} admin={admin} />
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mt-4">
                {error}
              </div>
            )}
          </>
        );
      case "Admin Management":
        return <AdminManagement currentAdmin={admin} />;
      case "Departments":
        return <DepartmentManagement currentAdmin={admin} />;
      default:
        return null;
    }
  };

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        admin={admin}
        onLogout={handleLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">{renderContent()}</main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-3 h-16">
          {["Feedbacks", "Admin", "Depts"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(
                  tab === "Feedbacks"
                    ? "Feedbacks"
                    : tab === "Admin"
                    ? "Admin Management"
                    : "Departments"
                )
              }
              className={`flex flex-col items-center justify-center text-xs ${
                activeTab ===
                (tab === "Feedbacks"
                  ? "Feedbacks"
                  : tab === "Admin"
                  ? "Admin Management"
                  : "Departments")
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
            >
              <span className="text-lg mb-1">
                {tab === "Feedbacks" ? "📋" : tab === "Admin" ? "👨‍💼" : "🏢"}
              </span>
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
