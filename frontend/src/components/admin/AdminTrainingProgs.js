// AdminDashboard.js
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [pendingPrograms, setPendingPrograms] = useState([]);

  useEffect(() => {
    // Fetch pending programs from the server
    fetch("http://localhost:9000/api/trainingPrograms/pending")
      .then((response) => response.json())
      .then((data) => setPendingPrograms(data))
      .catch((error) => console.error("Error fetching programs:", error));
  }, []);

  const handleAction = (programId, action) => {
    // Approve or reject a program
    fetch(`http://localhost:9000/api/trainingPrograms/${programId}/${action}`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          // Update the pending list
          setPendingPrograms((prev) =>
            prev.filter((program) => program.id !== programId)
          );
        } else {
          console.error("Error updating program:", response.statusText);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Admin Dashboard</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Program Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingPrograms.map((program) => (
            <tr key={program._id}>
              <td>{program.title}</td>
              <td>{program.description}</td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleAction(program._id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleAction(program.id, "reject")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
