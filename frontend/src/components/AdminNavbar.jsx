const AdminNavbar = ({ activeTab, setActiveTab }) => (
  <nav className="bg-white shadow-lg border-b">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex space-x-1">
          {["Feedbacks", "Admin Management", "Departments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Admin User</span>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default AdminNavbar;
