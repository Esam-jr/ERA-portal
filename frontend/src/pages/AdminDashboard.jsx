// AdminDashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import ExportButtons from "../components/ExportButtons";
import FeedbackTable from "../components/FeedbackTable";
import AdminManagement from "../components/AdminManagement";
import DepartmentManagement from "../components/DepartmentManagement";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Feedbacks");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);

  // Server-side filters
  const [branchName, setBranchName] = useState("");
  const [sector, setSector] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Client-side filters/search
  const [gender, setGender] = useState(""); // male | female | ""
  const [query, setQuery] = useState("");
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
        setAdmin(response.data.admin);
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

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (branchName.trim()) params.set("branchName", branchName.trim());
      if (sector) params.set("sector", sector);
      if (dateFrom) params.set("dateFrom", dateFrom);
      if (dateTo) params.set("dateTo", dateTo);

      const url = `/api/feedback/list?${params.toString()}`;
      const response = await axios.get(url, { withCredentials: true });

      // API returns { page, limit, total, items }
      setItems(response.data.items || []);
      if (typeof response.data.total === "number") setTotal(response.data.total);
      if (typeof response.data.page === "number") setPage(response.data.page);
      if (typeof response.data.limit === "number") setLimit(response.data.limit);
      setError("");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to load feedback");
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "Feedbacks") {
      fetchFeedback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page, limit]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Client-side filtered items (gender + free-text search)
  const filteredItems = useMemo(() => {
    let list = items;

    if (gender) {
      list = list.filter((it) => String(it.section1?.gender || "").toLowerCase() === gender);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((it) => {
        const branch = String(it.section1?.branchName || "").toLowerCase();
        const sectorV = String(it.section1?.sector || "").toLowerCase();
        const problems = (it.section4?.problems || []).join(" ").toLowerCase();
        const suggestions = (it.section4?.suggestions || []).join(" ").toLowerCase();
        const comment = String(it.section4?.additionalComment || "").toLowerCase();
        return (
          branch.includes(q) ||
          sectorV.includes(q) ||
          problems.includes(q) ||
          suggestions.includes(q) ||
          comment.includes(q)
        );
      });
    }

    return list;
  }, [items, gender, query]);

  const sectors = [
    { value: "", label: "All sectors" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "service", label: "Service" },
    { value: "wholesale", label: "Wholesale" },
    { value: "retail", label: "Retail" },
    { value: "construction", label: "Construction" },
    { value: "agriculture", label: "Agriculture" },
    { value: "import_export", label: "Import & Export" },
    { value: "mining", label: "Mining" },
  ];

  const handleApplyFilters = () => {
    setPage(1);
    fetchFeedback();
  };

  const handleClearFilters = () => {
    setBranchName("");
    setSector("");
    setDateFrom("");
    setDateTo("");
    setGender("");
    setQuery("");
    setPage(1);
    fetchFeedback();
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
              <ExportButtons data={filteredItems} admin={admin} />
            </div>

            {/* Filters */}
            <div className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs text-gray-600 mb-1">Search (branch, sector, problems, suggestions)</label>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type to search..."
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Branch name</label>
                  <input
                    type="text"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="e.g., Adama"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 bg-white"
                  >
                    {sectors.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 bg-white"
                  >
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">From</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">To</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleApplyFilters}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={handleClearFilters}
                    className="border px-4 py-2 rounded-md hover:bg-gray-50"
                  >
                    Clear
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Per page</label>
                  <select
                    value={limit}
                    onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                    className="border rounded-md px-2 py-1 bg-white"
                  >
                    {[10, 20, 50, 100].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <FeedbackTable data={filteredItems} loading={loading} admin={admin} onDataChange={fetchFeedback} />

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {total > 0 ? (
                  <span>
                    Showing {Math.min((page - 1) * limit + 1, total)}–{Math.min(page * limit, total)} of {total}
                  </span>
                ) : (
                  <span>No records</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="border px-3 py-1 rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  Prev
                </button>
                <span className="text-sm text-gray-700">Page {page}</span>
                <button
                  onClick={() => setPage((p) => (p * limit < total ? p + 1 : p))}
                  disabled={page * limit >= total}
                  className="border px-3 py-1 rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
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
