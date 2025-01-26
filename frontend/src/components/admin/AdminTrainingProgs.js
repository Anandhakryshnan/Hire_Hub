import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const AdminDashboard = () => {
  const [pendingPrograms, setPendingPrograms] = useState([]);
  const [approvedPrograms, setApprovedPrograms] = useState([]);
  const [qrCodes, setQrCodes] = useState({});
  const navigate = useNavigate();

  // Fetch pending programs
  useEffect(() => {
    fetch("http://localhost:9000/api/trainingPrograms/pending")
      .then((response) => response.json())
      .then((data) => setPendingPrograms(data))
      .catch((error) => console.error("Error fetching pending programs:", error));
  }, []);

  // Fetch approved programs
  useEffect(() => {
    fetch("http://localhost:9000/api/trainingPrograms/approved")
      .then((response) => response.json())
      .then((data) => setApprovedPrograms(data))
      .catch((error) => console.error("Error fetching approved programs:", error));
  }, []);

  const handleAction = (programId, action) => {
    fetch(`http://localhost:9000/api/trainingPrograms/${programId}/${action}`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          setPendingPrograms((prev) =>
            prev.filter((program) => program._id !== programId)
          );
          if (action === "approve") {
            fetch("http://localhost:9000/api/trainingPrograms/approved")
              .then((response) => response.json())
              .then((data) => setApprovedPrograms(data));
          }
        } else {
          console.error("Error updating program:", response.statusText);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const generateQrCode = (programId) => {
    fetch(`http://localhost:9000/api/sessions/generateQr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ programId, durationMinutes: 0.5 }), // 30 seconds
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.qrCodeData) {
          setQrCodes((prev) => ({ ...prev, [programId]: data.qrCodeData }));
          setTimeout(() => {
            generateQrCode(programId); // Regenerate QR code every 30 seconds
          }, 30 * 1000);
        }
      })
      .catch((error) => console.error("Error generating QR code:", error));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Pending Programs Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Pending Programs
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Program Name</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {pendingPrograms.length > 0 ? (
                  pendingPrograms.map((program) => (
                    <tr
                      key={program._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {program.title}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {program.description}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
                          onClick={() => handleAction(program._id, "approve")}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                          onClick={() => handleAction(program._id, "reject")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-4 text-gray-500 font-medium"
                    >
                      No pending programs available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Approved Programs Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Approved Programs
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Program Name</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-center">QR Code</th>
                  <th className="py-3 px-6 text-center">Attendance</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {approvedPrograms.length > 0 ? (
                  approvedPrograms.map((program) => (
                    <tr
                      key={program._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {program.title}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {program.description}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {qrCodes[program._id] ? (
                          <div>
                            <QRCodeSVG value={qrCodes[program._id]} size={128} />
                            <p className="text-gray-500 text-xs mt-2">
                              QR resets every 30 seconds.
                            </p>
                          </div>
                        ) : (
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            onClick={() => generateQrCode(program._id)}
                          >
                            Generate QR Code
                          </button>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button
                          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
                          onClick={() => navigate(`/attendance/${program._id}`)}
                        >
                          View Attendance
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 text-gray-500 font-medium"
                    >
                      No approved programs available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
