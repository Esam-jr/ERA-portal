import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function DepartmentManagement({ currentAdmin }) {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    manager: "",
  });

  useEffect(() => {
    // For now, we'll use mock data since there's no department API
    // In a real implementation, you would fetch from /api/departments
    setTimeout(() => {
      setDepartments([
        {
          _id: "1",
          name: "Tax Collection",
          description: "Handles tax collection and processing",
          location: "Ground Floor",
          manager: "John Doe",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          name: "Audit Services",
          description: "Conducts tax audits and investigations",
          location: "3rd Floor",
          manager: "Jane Smith",
          createdAt: new Date().toISOString(),
        },
        {
          _id: "3",
          name: "Customer Service",
          description: "Provides customer support and information",
          location: "1st Floor",
          manager: "Mike Johnson",
          createdAt: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock implementation - in real app, would POST to /api/departments
      const newDepartment = {
        _id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setDepartments([...departments, newDepartment]);
      setShowAddForm(false);
      setFormData({ name: "", description: "", location: "", manager: "" });
      setError("");
      toast.success("Department created successfully");
    } catch (error) {
      setError("Failed to add department");
    }
  };

  const handleDelete = async (departmentId) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;

    try {
      // Mock implementation - in real app, would DELETE /api/departments/:id
      setDepartments(departments.filter(dept => dept._id !== departmentId));
      toast.success("Department deleted successfully");
    } catch (error) {
      setError("Failed to delete department");
    }
  };

  if (loading) return <div className="text-center py-8">Loading departments...</div>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Department Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Department
        </button>
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
          <h3 className="text-lg font-semibold mb-3">Add New Department</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <input
              type="text"
              placeholder="Department Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Manager Name"
              value={formData.manager}
              onChange={(e) =>
                setFormData({ ...formData, manager: e.target.value })
              }
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="p-2 border rounded-md"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="p-2 border rounded-md md:col-span-1"
              rows="3"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Create Department
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <div key={department._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{department.name}</h3>
              <button
                onClick={() => handleDelete(department._id)}
                className="text-red-600 hover:text-red-800 text-sm"
                title="Delete Department"
              >
                🗑️
              </button>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <strong>Manager:</strong> {department.manager}
              </div>
              <div>
                <strong>Location:</strong> {department.location}
              </div>
              <div>
                <strong>Description:</strong> {department.description}
              </div>
              <div>
                <strong>Created:</strong> {new Date(department.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Edit
              </button>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {departments.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No departments found</p>
        </div>
      )}
    </div>
  );
}