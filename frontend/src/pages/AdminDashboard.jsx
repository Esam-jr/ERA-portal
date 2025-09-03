import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import ExportButtons from "../components/ExportButtons";
import FeedbackTable from "../components/FeedbackTable";
import AdminManagement from "../components/AdminManagement";
import DepartmentManagement from "../components/DepartmentManagement";
// Main Component
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Feedbacks");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`/api/feedback?page=1&limit=20`, {
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

  const renderContent = () => {
    switch (activeTab) {
      case "Feedbacks":
        return (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Feedbacks Management
              </h2>
              <ExportButtons data={items} />
            </div>
            <FeedbackTable data={items} loading={loading} />
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mt-4">
                {error}
              </div>
            )}
          </>
        );
      case "Admin Management":
        return <AdminManagement />;
      case "Departments":
        return <DepartmentManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 py-8">{renderContent()}</main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-3 h-16">
          {["Feedbacks", "Admin", "Depts"].map((tab, index) => (
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
