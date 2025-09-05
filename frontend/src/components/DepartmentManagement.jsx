import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  getServicesCatalog,
  setServicesCatalog,
  getTransparencyStatements,
  setTransparencyStatements,
  DEFAULT_SERVICES,
  DEFAULT_STATEMENTS,
} from "../utils/configStore";

export default function DepartmentManagement() {
  // Section 2 — Services
  const [services, setServices] = useState([]);
  const [svcFilter, setSvcFilter] = useState("");
  const [newService, setNewService] = useState({
    name: "",
    amharic: "",
    office: "",
    standard: "",
  });

  // Section 3 — Statements
  const [statements, setStatements] = useState([]);
  const [stmFilter, setStmFilter] = useState("");
  const [newStatement, setNewStatement] = useState("");

  // Load from storage
  useEffect(() => {
    try {
      setServices(getServicesCatalog());
      setStatements(getTransparencyStatements());
    } catch (e) {
      console.error(e);
      toast.error("Failed to load configuration");
    }
  }, []);

  // Derived lists with filtering
  const filteredServices = useMemo(() => {
    const q = svcFilter.trim().toLowerCase();
    if (!q) return services;
    return services.filter((s) =>
      [s.name, s.amharic, s.office, s.standard]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [services, svcFilter]);

  const filteredStatements = useMemo(() => {
    const q = stmFilter.trim().toLowerCase();
    if (!q) return statements;
    return statements.filter((s) => s.toLowerCase().includes(q));
  }, [statements, stmFilter]);

  // Handlers — Services
  const handleAddService = () => {
    const name = newService.name.trim();
    if (!name) return toast.error("Service name is required");

    const nextId = (services[services.length - 1]?.id || 0) + 1;
    const svc = {
      id: nextId,
      name,
      amharic: newService.amharic.trim(),
      office: newService.office.trim(),
      standard: newService.standard.trim(),
    };

    const next = [...services, svc];
    setServices(next);
    setServicesCatalog(next);
    setNewService({ name: "", amharic: "", office: "", standard: "" });
    toast.success("Service added");
  };

  const handleRemoveService = (id) => {
    if (!window.confirm("Remove this service?")) return;
    const next = services.filter((s) => s.id !== id);
    setServices(next);
    setServicesCatalog(next);
    toast.success("Service removed");
  };

  const handleResetServices = () => {
    if (!window.confirm("Reset to default services?")) return;
    setServices(DEFAULT_SERVICES);
    setServicesCatalog(DEFAULT_SERVICES);
    toast.success("Services reset to defaults");
  };

  // Handlers — Statements
  const handleAddStatement = () => {
    const value = newStatement.trim();
    if (!value) return toast.error("Statement text is required");
    const next = [...statements, value];
    setStatements(next);
    setTransparencyStatements(next);
    setNewStatement("");
    toast.success("Statement added");
  };

  const handleRemoveStatement = (idx) => {
    if (!window.confirm("Remove this statement?")) return;
    const next = statements.filter((_, i) => i !== idx);
    setStatements(next);
    setTransparencyStatements(next);
    toast.success("Statement removed");
  };

  const handleResetStatements = () => {
    if (!window.confirm("Reset to default statements?")) return;
    setStatements(DEFAULT_STATEMENTS);
    setTransparencyStatements(DEFAULT_STATEMENTS);
    toast.success("Statements reset to defaults");
  };

  return (
    <div className="space-y-8">
      {/* Section 2: Services Catalog Management */}
      <section className="bg-white rounded-xl shadow-sm border p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Section 2 — Services Catalog</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={svcFilter}
              onChange={(e) => setSvcFilter(e.target.value)}
              placeholder="Search services..."
              className="border rounded-md px-3 py-2 w-64"
            />
            <button
              onClick={handleResetServices}
              className="border px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Reset Defaults
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Add new service */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Add New Service</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Service Name (English)</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="e.g., Taxpayer registration"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Service Name (Amharic)</label>
                <input
                  type="text"
                  value={newService.amharic}
                  onChange={(e) => setNewService({ ...newService, amharic: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="የአማርኛ ስም"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Office</label>
                  <input
                    type="text"
                    value={newService.office}
                    onChange={(e) => setNewService({ ...newService, office: e.target.value })}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="e.g., 105"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Standard Time</label>
                  <input
                    type="text"
                    value={newService.standard}
                    onChange={(e) => setNewService({ ...newService, standard: e.target.value })}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="e.g., 30 min"
                  />
                </div>
              </div>
              <button
                onClick={handleAddService}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Service
              </button>
            </div>
          </div>

          {/* Services list */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Current Services ({filteredServices.length})</h3>
            <div className="max-h-[420px] overflow-auto divide-y">
              {filteredServices.map((s) => (
                <div key={s.id} className="py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-gray-800">{s.id}. {s.name}</div>
                      {s.amharic && (
                        <div className="text-sm text-gray-600">{s.amharic}</div>
                      )}
                      <div className="text-xs text-gray-500">
                        <span className="mr-3"><strong>Office:</strong> {s.office || "—"}</span>
                        <span><strong>Standard:</strong> {s.standard || "—"}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveService(s.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                      title="Remove"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {filteredServices.length === 0 && (
                <div className="text-sm text-gray-500 py-4">No services match your filter</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Transparency Statements Management */}
      <section className="bg-white rounded-xl shadow-sm border p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Section 3 — Transparency Statements</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={stmFilter}
              onChange={(e) => setStmFilter(e.target.value)}
              placeholder="Search statements..."
              className="border rounded-md px-3 py-2 w-64"
            />
            <button
              onClick={handleResetStatements}
              className="border px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Reset Defaults
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Add new statement */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Add New Statement</h3>
            <textarea
              value={newStatement}
              onChange={(e) => setNewStatement(e.target.value)}
              rows={3}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Write a new statement (Amharic and/or English)"
            />
            <div className="mt-2">
              <button
                onClick={handleAddStatement}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Statement
              </button>
            </div>
          </div>

          {/* Statements list */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Current Statements ({filteredStatements.length})</h3>
            <div className="max-h-[420px] overflow-auto divide-y">
              {filteredStatements.map((st, idx) => (
                <div key={idx} className="py-3 flex items-start justify-between gap-3">
                  <div className="text-sm text-gray-800">{idx + 1}. {st}</div>
                  <button
                    onClick={() => handleRemoveStatement(idx)}
                    className="text-red-600 hover:text-red-800 text-sm"
                    title="Remove"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {filteredStatements.length === 0 && (
                <div className="text-sm text-gray-500 py-4">No statements match your filter</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Changes are saved in the browser and will be used after integration in the form and reports. If you don't see updates in the form, refresh the page.
        </div>
      </section>
    </div>
  );
}
