import React, { useState, useEffect } from "react";

const AllPrograms = () => {
  const [approvedPrograms, setApprovedPrograms] = useState([]);
  const [appliedMaterials, setAppliedMaterials] = useState([]);
  const [appliedPrograms, setAppliedProgramsState] = useState([]);

  useEffect(() => {
    // Fetch approved programs from the server
    fetch("http://localhost:9000/api/trainingPrograms/approved")
      .then((response) => response.json())
      .then((data) => setApprovedPrograms(data))
      .catch((error) => console.error("Error fetching programs:", error));

    // Fetch the applied programs for the student
    const studentId = localStorage.getItem("token"); // Assuming token contains studentId
    fetch(`http://localhost:9000/api/students/${studentId}/appliedPrograms`)
      .then((response) => response.json())
      .then((data) => {
        setAppliedProgramsState(data);

        // Fetch materials for each program the student has applied to
        const materialsPromises = data.map((applied) =>
          fetch(
            `http://localhost:9000/api/materials/${applied._id}?studentId=${studentId}`
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                return []; // Return empty array if no materials are found
              }
            })
            .catch((error) => {
              console.error("Error fetching materials:", error);
              return [];
            })
        );

        // Aggregate all materials
        Promise.all(materialsPromises).then((allMaterials) => {
          setAppliedMaterials(allMaterials.flat()); // Flatten nested arrays of materials
        });
      })
      .catch((error) =>
        console.error("Error fetching applied programs:", error)
      );
  }, []);

  const handleApply = (programId) => {
    const studentId = localStorage.getItem("token");

    // Apply for a program
    fetch(`http://localhost:9000/api/trainingPrograms/${programId}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Applied successfully!");
          setAppliedProgramsState((prevState) => [...prevState, { programId }]); // Add to applied programs list
        } else {
          console.error("Error applying for program:", response.statusText);
        }
      })
      .catch((error) => console.error("Error:", error));
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
      <ul className="list-group">
        {appliedMaterials.map((material) => (
          <li key={material._id} className="list-group-item">
            {material.filename} -{" "}
            <a
              href={material.downloadLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-link"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPrograms;
