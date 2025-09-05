import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-9 w-9" />
          <Link to="/" className="text-lg font-semibold">
            ERA Feedback Portal
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <NavLink
            to="/submit"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-lg border ${
                isActive
                  ? "bg-emerald-50 text-blue-600 border-blue-200"
                  : "bg-white hover:bg-blue-700"
              }`
            }
          >
            Submit
          </NavLink>
          <Link
            to="/admin/login"
            className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-950"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
