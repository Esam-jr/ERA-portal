import * as XLSX from "xlsx";

const ExportButtons = ({ data }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        "Submitted Date": new Date(item.createdAt).toLocaleDateString(),
        "Submitted Time": new Date(item.createdAt).toLocaleTimeString(),
        Branch: item.section1?.branchName || "N/A",
        Sector: item.section1?.sector || "N/A",
        Gender: item.section1?.gender || "N/A",
        Age: item.section1?.age || "N/A",
        "Feedback ID": item._id,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedbacks");
    XLSX.writeFile(workbook, "feedbacks_export.xlsx");
  };

  const printTable = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
        <html>
          <head>
            <title>Feedbacks Export</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f8f9fa; }
              .header { text-align: center; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Feedbacks Management</h1>
              <p>Generated on ${new Date().toLocaleString()}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Submitted</th>
                  <th>Branch</th>
                  <th>Sector</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Feedback ID</th>
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (item) => `
                  <tr>
                    <td>${new Date(item.createdAt).toLocaleString()}</td>
                    <td>${item.section1?.branchName || "N/A"}</td>
                    <td>${item.section1?.sector || "N/A"}</td>
                    <td>${item.section1?.gender || "N/A"}</td>
                    <td>${item.section1?.age || "N/A"}</td>
                    <td>${item._id}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex space-x-3 mb-6">
      <button
        onClick={exportToExcel}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
      >
        <span>📊</span>
        <span>Export Excel</span>
      </button>
      <button
        onClick={printTable}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
      >
        <span>🖨️</span>
        <span>Print</span>
      </button>
    </div>
  );
};

export default ExportButtons;
