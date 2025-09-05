import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminManagement({ currentAdmin }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("/api/auth/list", {
        withCredentials: true,
      });
      const adminsList = response.data.admins || [];
      // Sort by creation date to identify the first admin (super admin)
      const sortedAdmins = adminsList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setAdmins(sortedAdmins);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if an admin is super admin (first created)
  const isSuperAdmin = (admin) => {
    if (admins.length === 0) return false;
    const firstAdmin = admins[0];
    return admin._id === firstAdmin._id;
  };

  // Check if current admin is super admin
  const isCurrentAdminSuper = currentAdmin && isSuperAdmin(currentAdmin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/create", formData, {
        withCredentials: true,
      });
      setShowAddForm(false);
      setFormData({ name: "", email: "", password: "" });
      fetchAdmins();
      setError("");
      toast.success("Admin created successfully");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to add admin");
    }
  };

  const handleDelete = async (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axios.delete(`/api/auth/${adminId}`, {
        withCredentials: true,
      });
      fetchAdmins();
      toast.success("Admin deleted successfully");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to delete admin");
    }
  };

  if (loading) return <div className="text-center py-8">Loading admins...</div>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Management</h2>
        {isCurrentAdminSuper && (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
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
              {isCurrentAdminSuper && (
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
                      isSuperAdmin(admin)
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {isSuperAdmin(admin) ? "Super Admin" : "Admin"}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                {isCurrentAdminSuper && !isSuperAdmin(admin) && (
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
