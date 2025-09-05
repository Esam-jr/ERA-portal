import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="ERA Logo"
            className="h-9 w-9 object-contain"
          />
          <Link
            to="/"
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            ERA Feedback Portal
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/submit"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Submit Feedback
          </NavLink>

          <a
            href="#purpose"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("purpose")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Purpose
          </a>

          <a
            href="#learn-more"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("learn-more")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            How it Works
          </a>

          {/* Admin Button */}
          <Link
            to="/admin/login"
            className="px-4 py-2 rounded-lg bg-blue-400 text-white font-medium hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
