const FeedbackTable = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No feedback submissions found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4 font-semibold text-gray-700">
              Submitted
            </th>
            <th className="text-left p-4 font-semibold text-gray-700">
              Branch
            </th>
            <th className="text-left p-4 font-semibold text-gray-700">
              Sector
            </th>
            <th className="text-left p-4 font-semibold text-gray-700">
              Gender
            </th>
            <th className="text-left p-4 font-semibold text-gray-700">Age</th>
            <th className="text-left p-4 font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((f, index) => (
            <tr
              key={f._id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 transition-colors`}
            >
              <td className="p-4">
                <div className="text-sm text-gray-900">
                  {new Date(f.createdAt).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(f.createdAt).toLocaleTimeString()}
                </div>
              </td>
              <td className="p-4">{f.section1?.branchName || "N/A"}</td>
              <td className="p-4">{f.section1?.sector || "N/A"}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    f.section1?.gender === "Male"
                      ? "bg-blue-100 text-blue-800"
                      : f.section1?.gender === "Female"
                      ? "bg-pink-100 text-pink-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {f.section1?.gender || "N/A"}
                </span>
              </td>
              <td className="p-4">
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                  {f.section1?.age || "N/A"}
                </span>
              </td>
              <td className="p-4">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
