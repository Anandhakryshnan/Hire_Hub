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
      .catch((error) => console.error("Error fetching applied programs:", error));
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
          setAppliedProgramsState((prevState) => [
            ...prevState,
            { programId },
          ]); // Add to applied programs list
        } else {
          console.error("Error applying for program:", response.statusText);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Training Programs</h2>
      <ul className="list-group mb-4">
        {approvedPrograms.map((program) => (
          <li
            key={program._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {program.title}
            {appliedPrograms.some((applied) => applied.programId === program._id) ? (
              <span className="badge bg-success">Applied</span>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleApply(program._id)}
              >
                Apply
              </button>
            )}
          </li>
        ))}
      </ul>

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
