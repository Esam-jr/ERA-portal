import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Service catalog for mapping service IDs to names
const servicesCatalog = [
  {
    id: 1,
    name: "Electronic tax declaration & payment support (eTax)",
    amharic: "በኤ-ታክስ ማስታወቅና ክፍያ ድጋፍ",
    office: "104",
    standard: "2 working days",
  },
  {
    id: 2,
    name: "Manual tax declaration & payment",
    amharic: "በማኑዋል ሥርዓት ታክስ ማስታወቅና ክፍያ",
    office: "104",
    standard: "10 min – 1h 30m",
  },
  {
    id: 3,
    name: "Clearance for license renewal / tenders / bank loans",
    amharic: "የክሊራንስ አገልግሎት (ፈቃድ አድሳስ…)",
    office: "105",
    standard: "30 min",
  },
  {
    id: 4,
    name: "Clearance for closure / ownership transfer / name or address change",
    amharic: "ድርጅት መዝጋት / ባለቤትነት መቀየር / ስም-አድራሻ ለውጥ",
    office: "105",
    standard: "1 hour",
  },
  {
    id: 5,
    name: "Sales receipt permit, return & cancellation",
    amharic: "የሽያጭ ደረሰኝ ፈቃድ/መመለስ/መሻር",
    office: "203",
    standard: "10 min – 1 hour",
  },
  {
    id: 6,
    name: "Cash register usage & support",
    amharic: "የሽያጭ መመዝገቢያ መሳሪያ አጠቃቀም እና ድጋፍ",
    office: "203",
    standard: "10 min – 45 working days",
  },
  {
    id: 7,
    name: "Record & archive: income/expense letters",
    amharic: "በሪከርድ እና ማህደር ገቢ-ወጪ ደብዳቤ",
    office: "—",
    standard: "10 – 20 min",
  },
  {
    id: 8,
    name: "Information & taxpayer education",
    amharic: "መረጃና የታክስ ትምህርት",
    office: "105",
    standard: "10 min – 8 hours",
  },
  {
    id: 9,
    name: "Service audit / business closure, sale or capital asset transfer",
    amharic: "የአገልግሎት ኦዲት / ንብረት ሽያጭ/ስጦታ",
    office: "Ground",
    standard: "—",
  },
  {
    id: 10,
    name: "Tax calculation service",
    amharic: "የታክስ ስሌት አገልግሎት",
    office: "203",
    standard: "Up to 20 min",
  },
  {
    id: 11,
    name: "Tax audit service",
    amharic: "የታክስ ኦዲት አገልግሎት",
    office: "108 & 3rd floor",
    standard: "1 – 16 working days",
  },
  {
    id: 12,
    name: "Tax fraud audit service",
    amharic: "የታክስ ማጭበርበር ኦዲት",
    office: "409",
    standard: "1 – 30 working days",
  },
  {
    id: 13,
    name: "Tax refund service",
    amharic: "የታክስ ተመላሽ",
    office: "Ground",
    standard: "10 – 30 working days",
  },
  {
    id: 14,
    name: "Taxpayer registration",
    amharic: "የግብር ከፋይ ምዝገባ",
    office: "105",
    standard: "30 – 45 min",
  },
  {
    id: 15,
    name: "Taxpayer TIN cancellation (upon request)",
    amharic: "���ለያ ቁጥር ስረዛ",
    office: "105",
    standard: "1 hour",
  },
  {
    id: 16,
    name: "VAT registration (upon request)",
    amharic: "የተጨማሪ እሴት ታክስ ምዝገባ",
    office: "105",
    standard: "1 – 30 min",
  },
  {
    id: 17,
    name: "Tax debt rescheduling agreement (upon use)",
    amharic: "የታክስ ዕዳ ክፍያ ማራዘሚያ ጊዜ ስምምነት",
    office: "205",
    standard: "40 min – 5 working days",
  },
  {
    id: 18,
    name: "Appeal response for tax decisions",
    amharic: "በታክስ ውሳኔ ቅሬታ ምላሽ",
    office: "Oromia Building",
    standard: "30 – 180 working days",
  },
];

const transparencyStatements = [
  "Service procedures are brief and clear / የቅ/ጽ/ቤት አገልግሎት ለመስጠት የዘረጋቸው አሰራሮች አጭር እና ግልፅ ናቸው፡፡",
  "Decisions and services are lawful and fair / የቅ/ጽ/ቤት የሚሰጣቸው ውሳኔዎች እና አገልግሎቶች ህግን የተከተሉና ፍትሃዊነትን የተላበሱ ናቸው፡፡",
  "Technology (e.g., SIGTAS) strongly supports service delivery / የቅ/ጽ/ቤት የሚጠቀምበት የቴክኖሎጂ ሥርዓት (ለምሳሌ ሲግታስ) አገልግሎት ለማሳለጥ ከፍተኛ እገዛ አድርጓል፡፡",
  "Electronic methods (eTax) reduce taxpayer burden / የቅ/ጽ/ቤት ታክስን በኤሌክትሮኒክስ ዘዴ (በኢታክስ) የማሳወቅ እና የመክፈል ዘዴን ስራ ላይ በማዋሉ የታክስ ከፋዩን ጫና እያቃለለ ይገኛል፡፡",
  "Staff serve with honesty, respect and accountability / የቅ/ጽ/ቤት ሠራተኞች በቅንነት፣ በአክብሮት እና በተጠያቂነት መንፈስ እያገለገሉ ናቸው፡፡",
  "Staff have adequate tax knowledge and experience / የቅ/ጽ/ቤት ሠራተኞች በታክስ ጉዳዮች ዙሪያ በቂ እውቀት እና ልምድ አላቸው፡፡",
  "Staff provide prompt responses to inquiries / የቅ/ጽ/ቤት ሰራተኞች ከተገልጋዮች ለሚቀርቡ ጥያቄዎች ፈጣን ምላሽ ይሰጣሉ፡፡",
  "Staff maintain proper professional conduct / የቅ/ጽ/ቤት ሠራተኞች ተገቢውን ስነ - ምግባር በማሟላት አገልግሎት ይሰጣሉ፡፡",
  "Staff respect official working hours / የቅ/ጽ/ቤት ሠራተኞች የመንግስት የስራ ሰዓት ያከብራሉ፡፡",
  "Professionals/managers are accessible and willing to explain / በደረጃው ያሉ የቅ/ጽ/ቤት ባለሙያዎች እና የስራ ኃላፊዎች ���ረጃዎችና ማብራሪያዎችን ለመስጠት ተደራሽና ፈቃደኛ ናቸው፡፡",
  "Taxpayer education is provided adequately / የቅ/ጽ/ቤት የታክስ ከፋዮችን ክፍተት በመለየት በቂ ትምህርት እየሰጠ ይገኛል፡፡",
  "It's easy to reach the responsible person for a case / የቅ/ጽ/ቤት ተገልጋዩ ጉዳዩ የሚመለከተውን አካል በቀላሉ ማግኘት የሚያስችል አሠራር አለው፡፡",
  "Management and staff show initiative to assist taxpayers / የቅ/ጽ/ቤት ኃላፊዎችና ሰራተኞች ተገልጋዩን ለማገዝ ተነሳሽነት አላቸው፡፡",
  "Management and staff are free from corruption/unethical practices / የቅ/ጽ/ቤት ኃላፊዎችና ሰራተኞች ከአድሏዊ አሰራርና ከሙስና የጸዱ ናቸው፡፡",
  "Premises are relatively convenient / የቅ/ጽ/ቤት ተገልጋዮችን ለማስተናገድ የሚያስችል በአንጻራዊነት ምቹ የስራ ቦታ አለው፡፡",
];

const FeedbackTable = ({ data, loading, admin, onDataChange }) => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // Helper functions for formatting data
  const getServiceInfo = (serviceId) => {
    const service = servicesCatalog.find(s => s.id === serviceId);
    return service || { 
      name: `Service #${serviceId}`, 
      amharic: "Unknown service", 
      office: "N/A", 
      standard: "N/A" 
    };
  };

  const getTransparencyStatement = (index) => {
    return transparencyStatements[index] || `Statement #${index + 1}`;
  };

  const formatGender = (gender) => {
    const genderMap = {
      'male': 'Male / ወንድ',
      'female': 'Female / ሴት'
    };
    return genderMap[gender] || gender || "Not specified";
  };

  const formatAge = (age) => {
    const ageMap = {
      '18_35': '18–35 years',
      '36_45': '36–45 years',
      '46_60': '46–60 years',
      '60_plus': '60+ years'
    };
    return ageMap[age] || age || "Not specified";
  };

  const formatEducation = (education) => {
    const educationMap = {
      'upto12': 'Up to Grade 12',
      'tvet_cert': 'TVET Certificate',
      'college_diploma': 'College Diploma',
      'bachelor_plus': 'First Degree+'
    };
    return educationMap[education] || education || "Not specified";
  };

  const formatNationality = (nationality, other) => {
    if (nationality === 'other' && other) return other;
    return nationality === 'ethiopian' ? 'Ethiopian' : nationality || "Not specified";
  };

  const formatSector = (sector, other) => {
    const sectorMap = {
      'manufacturing': 'Manufacturing',
      'service': 'Service',
      'wholesale': 'Wholesale',
      'retail': 'Retail',
      'construction': 'Construction',
      'agriculture': 'Agriculture',
      'import_export': 'Import & Export',
      'mining': 'Mining'
    };
    if (sector === 'other' && other) return other;
    return sectorMap[sector] || sector || "Not specified";
  };

  const formatLegalStatus = (legal, other) => {
    const legalMap = {
      'gov_dev': "Gov't Dev. Enterprise",
      'plc': 'PLC',
      'share_company': 'Share Company',
      'partnership': 'Partnership'
    };
    if (legal === 'other' && other) return other;
    return legalMap[legal] || legal || "Not specified";
  };

  const formatYears = (years) => {
    const yearsMap = {
      'lt2': '< 2 years',
      '2to5': '2–5 years',
      '5to9': '5–9 years',
      'gt9': '> 9 years'
    };
    return yearsMap[years] || years || "Not specified";
  };

  const formatRole = (role, other) => {
    const roleMap = {
      'owner': 'Owner',
      'owner_manager': 'Owner & Manager',
      'hired_manager': 'Hired Manager',
      'agent': 'Agent',
      'employee': 'Employee'
    };
    if (role === 'other' && other) return other;
    return roleMap[role] || role || "Not specified";
  };

  const formatTimeVsStandard = (time) => {
    const timeMap = {
      'as_standard': 'As per standard',
      'less': 'Less than standard',
      'more': 'More than standard'
    };
    return timeMap[time] || time || "Not rated";
  };

  const formatSatisfaction = (satisfaction) => {
    const satisfactionMap = {
      1: 'Very Low',
      2: 'Low',
      3: 'Neutral',
      4: 'High',
      5: 'Very High'
    };
    return satisfaction ? `${satisfactionMap[satisfaction]} (${satisfaction}/5)` : "Not rated";
  };

  const formatLikertRating = (rating) => {
    const likertMap = {
      1: 'Strongly Disagree',
      2: 'Disagree',
      3: 'Neutral',
      4: 'Agree',
      5: 'Strongly Agree'
    };
    return rating ? `${likertMap[rating]} (${rating}/5)` : "Not rated";
  };

  // Color coding functions
  const getTimeVsStandardColor = (time) => {
    const colorMap = {
      'as_standard': 'bg-green-100 text-green-800',
      'less': 'bg-red-100 text-red-800',
      'more': 'bg-yellow-100 text-yellow-800'
    };
    return colorMap[time] || 'bg-gray-100 text-gray-800';
  };

  const getSatisfactionColor = (satisfaction) => {
    if (satisfaction >= 4) return 'bg-green-100 text-green-800';
    if (satisfaction >= 3) return 'bg-yellow-100 text-yellow-800';
    if (satisfaction >= 1) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getLikertColor = (rating) => {
    if (rating >= 4) return 'bg-green-100 text-green-800';
    if (rating >= 3) return 'bg-yellow-100 text-yellow-800';
    if (rating >= 1) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Print function for detailed feedback
  const printFeedbackDetails = (feedback) => {
    const printContent = `
      <html>
        <head>
          <title>Feedback Details Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .section { margin-bottom: 25px; page-break-inside: avoid; }
            .section-title { background-color: #f0f0f0; padding: 10px; font-weight: bold; font-size: 16px; margin-bottom: 15px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
            .info-item { padding: 5px 0; }
            .service-item { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; }
            .service-name { font-weight: bold; margin-bottom: 5px; }
            .service-details { font-size: 12px; color: #666; }
            .rating-high { background-color: #d4edda; padding: 2px 6px; border-radius: 3px; }
            .rating-medium { background-color: #fff3cd; padding: 2px 6px; border-radius: 3px; }
            .rating-low { background-color: #f8d7da; padding: 2px 6px; border-radius: 3px; }
            .feedback-list { margin-left: 20px; }
            .no-data { font-style: italic; color: #666; }
            @media print { body { margin: 0; } .section { page-break-inside: avoid; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>ERA Feedback Portal - Detailed Feedback Report</h1>
            <p>Ethiopian Revenues and Customs Authority</p>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Report ID: ${feedback._id}</p>
          </div>

          <div class="section">
            <div class="section-title">Section 1: General Information</div>
            <div class="info-grid">
              <div class="info-item"><strong>Gender:</strong> ${formatGender(feedback.section1?.gender)}</div>
              <div class="info-item"><strong>Age Group:</strong> ${formatAge(feedback.section1?.age)}</div>
              <div class="info-item"><strong>Education:</strong> ${formatEducation(feedback.section1?.education)}</div>
              <div class="info-item"><strong>Nationality:</strong> ${formatNationality(feedback.section1?.nationality, feedback.section1?.nationalityOther)}</div>
              <div class="info-item"><strong>Business Sector:</strong> ${formatSector(feedback.section1?.sector, feedback.section1?.sectorOther)}</div>
              <div class="info-item"><strong>Legal Status:</strong> ${formatLegalStatus(feedback.section1?.legal, feedback.section1?.legalOther)}</div>
              <div class="info-item"><strong>Years Using Services:</strong> ${formatYears(feedback.section1?.years)}</div>
              <div class="info-item"><strong>Role:</strong> ${formatRole(feedback.section1?.role, feedback.section1?.roleOther)}</div>
            </div>
            <div class="info-item"><strong>Tax Branch Office:</strong> ${feedback.section1?.branchName || "Not specified"}</div>
          </div>

          <div class="section">
            <div class="section-title">Section 2: Service Standards & Satisfaction</div>
            ${feedback.section2 && feedback.section2.length > 0 ? 
              feedback.section2.map(service => {
                const serviceInfo = getServiceInfo(service.serviceId);
                return `
                  <div class="service-item">
                    <div class="service-name">${serviceInfo.name}</div>
                    <div class="service-details">${serviceInfo.amharic}</div>
                    <div class="service-details">Office: ${serviceInfo.office} | Standard: ${serviceInfo.standard}</div>
                    <div style="margin-top: 8px;">
                      <strong>Time vs Standard:</strong> <span class="${service.timeVsStandard === 'as_standard' ? 'rating-high' : service.timeVsStandard === 'more' ? 'rating-medium' : 'rating-low'}">${formatTimeVsStandard(service.timeVsStandard)}</span>
                      <br>
                      <strong>Satisfaction:</strong> <span class="${service.satisfaction >= 4 ? 'rating-high' : service.satisfaction >= 3 ? 'rating-medium' : 'rating-low'}">${formatSatisfaction(service.satisfaction)}</span>
                    </div>
                  </div>
                `;
              }).join('') : 
              '<p class="no-data">No service ratings provided</p>'
            }
          </div>

          <div class="section">
            <div class="section-title">Section 3: Transparency, Fairness & Workplace Convenience</div>
            ${feedback.section3 && feedback.section3.length > 0 ? 
              feedback.section3.map((rating, index) => `
                <div class="service-item">
                  <div style="margin-bottom: 8px;">${getTransparencyStatement(index)}</div>
                  <div>
                    <strong>Rating:</strong> <span class="${rating.rating >= 4 ? 'rating-high' : rating.rating >= 3 ? 'rating-medium' : 'rating-low'}">${formatLikertRating(rating.rating)}</span>
                    ${rating.reason ? `<br><strong>Reason:</strong> ${rating.reason}` : ''}
                  </div>
                </div>
              `).join('') : 
              '<p class="no-data">No transparency ratings provided</p>'
            }
          </div>

          <div class="section">
            <div class="section-title">Section 4: General Feedback</div>
            
            <div style="margin-bottom: 15px;">
              <strong>Main Problems Observed:</strong>
              ${feedback.section4?.problems && feedback.section4.problems.filter(p => p.trim()).length > 0 ? 
                `<ul class="feedback-list">${feedback.section4.problems.filter(p => p.trim()).map(problem => `<li>${problem}</li>`).join('')}</ul>` : 
                '<p class="no-data">No problems reported</p>'
              }
            </div>

            <div style="margin-bottom: 15px;">
              <strong>Suggestions for Improvement:</strong>
              ${feedback.section4?.suggestions && feedback.section4.suggestions.filter(s => s.trim()).length > 0 ? 
                `<ul class="feedback-list">${feedback.section4.suggestions.filter(s => s.trim()).map(suggestion => `<li>${suggestion}</li>`).join('')}</ul>` : 
                '<p class="no-data">No suggestions provided</p>'
              }
            </div>

            <div>
              <strong>Additional Comments:</strong>
              ${feedback.section4?.additionalComment && feedback.section4.additionalComment.trim() ? 
                `<p style="margin-left: 20px;">${feedback.section4.additionalComment}</p>` : 
                '<p class="no-data">No additional comments provided</p>'
              }
            </div>
          </div>

          <div class="section">
            <div class="section-title">Submission Information</div>
            <div class="info-item"><strong>Submitted Date:</strong> ${new Date(feedback.createdAt).toLocaleDateString()}</div>
            <div class="info-item"><strong>Submitted Time:</strong> ${new Date(feedback.createdAt).toLocaleTimeString()}</div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

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
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Feedback Details
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => printFeedbackDetails(selectedFeedback)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <span>🖨️</span>
                    <span>Print</span>
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Section 1: General Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">Section 1: General Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Gender:</strong> {formatGender(selectedFeedback.section1?.gender)}</div>
                    <div><strong>Age Group:</strong> {formatAge(selectedFeedback.section1?.age)}</div>
                    <div><strong>Education Level:</strong> {formatEducation(selectedFeedback.section1?.education)}</div>
                    <div><strong>Nationality:</strong> {formatNationality(selectedFeedback.section1?.nationality, selectedFeedback.section1?.nationalityOther)}</div>
                    <div><strong>Business Sector:</strong> {formatSector(selectedFeedback.section1?.sector, selectedFeedback.section1?.sectorOther)}</div>
                    <div><strong>Legal Status:</strong> {formatLegalStatus(selectedFeedback.section1?.legal, selectedFeedback.section1?.legalOther)}</div>
                    <div><strong>Years Using Services:</strong> {formatYears(selectedFeedback.section1?.years)}</div>
                    <div><strong>Role in Organization:</strong> {formatRole(selectedFeedback.section1?.role, selectedFeedback.section1?.roleOther)}</div>
                    <div className="col-span-2"><strong>Tax Branch Office:</strong> {selectedFeedback.section1?.branchName || "Not specified"}</div>
                  </div>
                </div>

                {/* Section 2: Service Ratings */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">Section 2: Service Standards & Satisfaction</h3>
                  {selectedFeedback.section2 && selectedFeedback.section2.length > 0 ? (
                    <div className="space-y-4">
                      {selectedFeedback.section2.map((service, index) => {
                        const serviceInfo = getServiceInfo(service.serviceId);
                        return (
                          <div key={index} className="bg-white p-3 rounded border">
                            <div className="font-medium text-gray-800 mb-2">{serviceInfo.name}</div>
                            <div className="text-sm text-gray-600 mb-2">{serviceInfo.amharic}</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <strong>Time vs Standard:</strong> 
                                <span className={`ml-2 px-2 py-1 rounded text-xs ${getTimeVsStandardColor(service.timeVsStandard)}`}>
                                  {formatTimeVsStandard(service.timeVsStandard)}
                                </span>
                              </div>
                              <div>
                                <strong>Satisfaction Level:</strong> 
                                <span className={`ml-2 px-2 py-1 rounded text-xs ${getSatisfactionColor(service.satisfaction)}`}>
                                  {formatSatisfaction(service.satisfaction)}
                                </span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              <strong>Standard Time:</strong> {serviceInfo.standard} | <strong>Office:</strong> {serviceInfo.office}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-600 italic">No service ratings provided</p>
                  )}
                </div>

                {/* Section 3: Transparency Ratings */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">Section 3: Transparency, Fairness & Workplace Convenience</h3>
                  {selectedFeedback.section3 && selectedFeedback.section3.length > 0 ? (
                    <div className="space-y-3">
                      {selectedFeedback.section3.map((rating, index) => {
                        const statement = getTransparencyStatement(index);
                        return (
                          <div key={index} className="bg-white p-3 rounded border">
                            <div className="text-sm text-gray-800 mb-2">{statement}</div>
                            <div className="flex items-center space-x-4">
                              <div>
                                <strong>Rating:</strong> 
                                <span className={`ml-2 px-2 py-1 rounded text-xs ${getLikertColor(rating.rating)}`}>
                                  {formatLikertRating(rating.rating)}
                                </span>
                              </div>
                              {rating.reason && (
                                <div className="flex-1">
                                  <strong>Reason:</strong> <span className="text-gray-700">{rating.reason}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-600 italic">No transparency ratings provided</p>
                  )}
                </div>

                {/* Section 4: General Feedback */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">Section 4: General Feedback</h3>
                  <div className="space-y-4">
                    {/* Problems */}
                    <div className="bg-white p-3 rounded border">
                      <h4 className="font-medium text-gray-800 mb-2">Main Problems Observed</h4>
                      {selectedFeedback.section4?.problems && selectedFeedback.section4.problems.filter(p => p.trim()).length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {selectedFeedback.section4.problems.filter(p => p.trim()).map((problem, index) => (
                            <li key={index} className="text-gray-700">{problem}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic text-sm">No problems reported</p>
                      )}
                    </div>

                    {/* Suggestions */}
                    <div className="bg-white p-3 rounded border">
                      <h4 className="font-medium text-gray-800 mb-2">Suggestions for Improvement</h4>
                      {selectedFeedback.section4?.suggestions && selectedFeedback.section4.suggestions.filter(s => s.trim()).length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {selectedFeedback.section4.suggestions.filter(s => s.trim()).map((suggestion, index) => (
                            <li key={index} className="text-gray-700">{suggestion}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic text-sm">No suggestions provided</p>
                      )}
                    </div>

                    {/* Additional Comments */}
                    <div className="bg-white p-3 rounded border">
                      <h4 className="font-medium text-gray-800 mb-2">Additional Comments</h4>
                      {selectedFeedback.section4?.additionalComment && selectedFeedback.section4.additionalComment.trim() ? (
                        <p className="text-sm text-gray-700">{selectedFeedback.section4.additionalComment}</p>
                      ) : (
                        <p className="text-gray-500 italic text-sm">No additional comments provided</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submission Details */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">Submission Information</h3>
                  <div className="text-sm space-y-1">
                    <div><strong>Submitted Date:</strong> {new Date(selectedFeedback.createdAt).toLocaleDateString()}</div>
                    <div><strong>Submitted Time:</strong> {new Date(selectedFeedback.createdAt).toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => printFeedbackDetails(selectedFeedback)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Print Details
                </button>
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
