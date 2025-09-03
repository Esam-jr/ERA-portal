import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`/api/feedback?page=1&limit=20`, {
          credentials: "include",
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Failed (${res.status})`);
        }
        const data = await res.json();
        if (active) setItems(data.items || []);
      } catch (e) {
        if (active) setError(e.message || "Failed to load");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto border rounded-xl bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Submitted</th>
                <th className="text-left p-3">Branch</th>
                <th className="text-left p-3">Sector</th>
                <th className="text-left p-3">Gender</th>
                <th className="text-left p-3">Age</th>
              </tr>
            </thead>
            <tbody>
              {items.map((f) => (
                <tr key={f._id} className="border-t">
                  <td className="p-3">{new Date(f.createdAt).toLocaleString()}</td>
                  <td className="p-3">{f.section1?.branchName}</td>
                  <td className="p-3">{f.section1?.sector}</td>
                  <td className="p-3">{f.section1?.gender}</td>
                  <td className="p-3">{f.section1?.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
