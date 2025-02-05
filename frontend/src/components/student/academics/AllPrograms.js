import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";

const AllPrograms = () => {
  const [approvedPrograms, setApprovedPrograms] = useState([]);
  const [appliedMaterials, setAppliedMaterials] = useState([]);
  const [appliedPrograms, setAppliedProgramsState] = useState([]);
  const [showScanner, setShowScanner] = useState(false); // Toggle QR scanner visibility
  const [isScanning, setIsScanning] = useState(false); // Prevent multiple scans

  useEffect(() => {
    fetch("/api/trainingPrograms/approved")
      .then((response) => response.json())
      .then((data) => setApprovedPrograms(data))
      .catch((error) => console.error("Error fetching programs:", error));

    const studentId = localStorage.getItem("token");

    fetch(`/api/students/${studentId}/appliedPrograms`)
      .then((response) => response.json())
      .then((data) => {
        setAppliedProgramsState(data);
        const materialsPromises = data.map((appliedProgram) =>
          fetch(`/api/materials/${appliedProgram._id}?studentId=${studentId}`)
            .then((response) => (response.ok ? response.json() : []))
            .catch((error) => {
              console.error("Error fetching materials:", error);
              return [];
            })
        );

        Promise.all(materialsPromises).then((allMaterials) => {
          const programsWithMaterials = data.map((program, index) => ({
            ...program,
            materials: allMaterials[index],
          }));
          setAppliedMaterials(programsWithMaterials);
        });
      })
      .catch((error) =>
        console.error("Error fetching applied programs:", error)
      );
  }, []);

  const handleApply = (programId) => {
    const studentId = localStorage.getItem("token");

    fetch(`/api/trainingPrograms/${programId}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Applied successfully!");
          setAppliedProgramsState((prevState) => [...prevState, { programId }]);
        } else {
          console.error("Error applying for program:", response.statusText);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleScan = (data) => {
    if (data && !isScanning) {
      setIsScanning(true); // Prevent further scans

      const qrToken = data.text;
      const studentId = localStorage.getItem("token");

      fetch("/api/markAttendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrToken, studentId }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            alert("Attendance marked successfully!");
          } else {
            alert(result.error || "Error marking attendance");
          }
        })
        .catch((err) => console.error("Error:", err))
        .finally(() => {
          setTimeout(() => setIsScanning(false), 3000); // Allow new scan after 3 seconds
        });
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Training Programs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedPrograms.map((program) => (
          <div
            key={program._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-700">
              {program.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">From:</span>{" "}
              {new Date(program.fromDate).toLocaleDateString()} <br />
              <span className="font-medium">To:</span>{" "}
              {new Date(program.toDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Venue:</span> {program.venue}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Time:</span> {program.time}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Description:</span>{" "}
              {program.description}
            </p>
            <div className="flex justify-between items-center">
              {appliedPrograms.some(
                (applied) => applied._id === program._id
              ) ? (
                <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                  Applied
                </span>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300"
                  onClick={() => handleApply(program._id)}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-center">Downloadable Materials</h2>
      <div className="space-y-6">
        {appliedMaterials.map((program) => (
          <div key={program._id} className="border rounded-lg p-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{program.title}</h3>
            <ul className="space-y-2">
              {program.materials.length > 0 ? (
                program.materials.map((material) => (
                  <li
                    key={material._id}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition duration-300"
                  >
                    <span className="text-sm">{material.filename}</span>
                    <a
                      href={material.downloadLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-link text-blue-600 hover:text-blue-800"
                    >
                      Download
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">
                  No materials available
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-center">QR Code Scanner</h2>
      <div className="text-center">
        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
          onClick={() => setShowScanner(!showScanner)}
        >
          {showScanner ? "Hide Scanner" : "Scan QR Code"}
        </button>

        {showScanner && (
          <div className="flex justify-center">
            <QrScanner
              delay={300}
              style={{ width: "300px" }}
              onError={handleError}
              onScan={handleScan}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default AllPrograms;
