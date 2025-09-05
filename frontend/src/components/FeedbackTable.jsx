import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FeedbackTable = ({ data, loading, admin, onDataChange }) => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleViewDetails = async (feedbackId) => {
    try {
      const response = await axios.get(`/api/feedback/${feedbackId}`, {
        withCredentials: true,
      });
      setSelectedFeedback(response.data);
      setShowModal(true);
    } catch (error) {
      toast.error("Failed to load feedback details");
      console.error("Error fetching feedback details:", error);
    }
  };

  const handleDelete = async (feedbackId) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }

    setDeleting(feedbackId);
    try {
      await axios.delete(`/api/feedback/${feedbackId}`, {
        withCredentials: true,
      });
      toast.success("Feedback deleted successfully");
      if (onDataChange) onDataChange();
    } catch (error) {
      toast.error("Failed to delete feedback");
      console.error("Error deleting feedback:", error);
    } finally {
      setDeleting(null);
    }
  };

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
    <>
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
                      f.section1?.gender === "male"
                        ? "bg-blue-100 text-blue-800"
                        : f.section1?.gender === "female"
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(f._id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete(f._id)}
                      disabled={deleting === f._id}
                      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    >
                      {deleting === f._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Details Modal */}
      {showModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Feedback Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Section 1: General Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">General Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Gender:</strong> {selectedFeedback.section1?.gender || "N/A"}</div>
                    <div><strong>Age:</strong> {selectedFeedback.section1?.age || "N/A"}</div>
                    <div><strong>Education:</strong> {selectedFeedback.section1?.education || "N/A"}</div>
                    <div><strong>Nationality:</strong> {selectedFeedback.section1?.nationality || "N/A"}</div>
                    <div><strong>Sector:</strong> {selectedFeedback.section1?.sector || "N/A"}</div>
                    <div><strong>Legal Status:</strong> {selectedFeedback.section1?.legal || "N/A"}</div>
                    <div><strong>Years Using Services:</strong> {selectedFeedback.section1?.years || "N/A"}</div>
                    <div><strong>Role:</strong> {selectedFeedback.section1?.role || "N/A"}</div>
                    <div className="col-span-2"><strong>Branch Name:</strong> {selectedFeedback.section1?.branchName || "N/A"}</div>
                  </div>
                </div>

                {/* Section 2: Service Ratings */}
                {selectedFeedback.section2 && selectedFeedback.section2.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Service Ratings</h3>
                    <div className="space-y-2">
                      {selectedFeedback.section2.map((service, index) => (
                        <div key={index} className="text-sm border-b pb-2">
                          <div><strong>Service ID:</strong> {service.serviceId}</div>
                          <div><strong>Time vs Standard:</strong> {service.timeVsStandard || "N/A"}</div>
                          <div><strong>Satisfaction:</strong> {service.satisfaction || "N/A"}/5</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 3: Transparency Ratings */}
                {selectedFeedback.section3 && selectedFeedback.section3.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Transparency Ratings</h3>
                    <div className="space-y-2">
                      {selectedFeedback.section3.map((rating, index) => (
                        <div key={index} className="text-sm border-b pb-2">
                          <div><strong>Rating:</strong> {rating.rating}/5</div>
                          {rating.reason && <div><strong>Reason:</strong> {rating.reason}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 4: General Feedback */}
                {selectedFeedback.section4 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">General Feedback</h3>
                    <div className="space-y-3 text-sm">
                      {selectedFeedback.section4.problems && selectedFeedback.section4.problems.length > 0 && (
                        <div>
                          <strong>Problems:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {selectedFeedback.section4.problems.map((problem, index) => (
                              <li key={index}>{problem}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedFeedback.section4.suggestions && selectedFeedback.section4.suggestions.length > 0 && (
                        <div>
                          <strong>Suggestions:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {selectedFeedback.section4.suggestions.map((suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedFeedback.section4.additionalComment && (
                        <div>
                          <strong>Additional Comments:</strong>
                          <p className="mt-1">{selectedFeedback.section4.additionalComment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Submission Details</h3>
                  <div className="text-sm space-y-1">
                    <div><strong>Submitted:</strong> {new Date(selectedFeedback.createdAt).toLocaleString()}</div>
                    <div><strong>IP Address:</strong> {selectedFeedback.meta?.ip || "N/A"}</div>
                    <div><strong>User Agent:</strong> {selectedFeedback.meta?.userAgent || "N/A"}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackTable;
