import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminManagement({ currentAdmin }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("/api/admin/admins", {
        withCredentials: true,
      });
      setAdmins(response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/admins", formData, {
        withCredentials: true,
      });
      setShowAddForm(false);
      setFormData({ name: "", email: "", password: "", role: "admin" });
      fetchAdmins();
      setError("");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to add admin");
    }
  };

  const handleDelete = async (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axios.delete(`/api/admin/admins/${adminId}`, {
        withCredentials: true,
      });
      fetchAdmins();
    } catch (error) {
      setError(error.response?.data?.error || "Failed to delete admin");
    }
  };

  if (loading) return <div className="text-center py-8">Loading admins...</div>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Management</h2>
        {currentAdmin?.role === "superadmin" && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Admin
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-4 rounded-md mb-6"
        >
          <h3 className="text-lg font-semibold mb-3">Add New Admin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-2 border rounded-md"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-2 border rounded-md"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="p-2 border rounded-md"
              required
            />
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="p-2 border rounded-md"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Create Admin
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Created</th>
              {currentAdmin?.role === "superadmin" && (
                <th className="text-left p-3">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{admin.name}</td>
                <td className="p-3">{admin.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      admin.role === "superadmin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {admin.role}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                {currentAdmin?.role === "superadmin" &&
                  admin.role !== "superadmin" && (
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
