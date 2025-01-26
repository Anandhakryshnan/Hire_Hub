import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TrainingCompanyDashboard = () => {
  const companyId = localStorage.getItem("token");
  const [programs, setPrograms] = useState([]);
  const [appliedStudents, setAppliedStudents] = useState([]);
  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    venue: "",
    fromDate: "",
    toDate: "",
    time: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch training programs
    fetch(`http://localhost:9000/api/trainingPrograms?companyId=${companyId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPrograms(data))
      .catch((err) => console.error("Error fetching training programs:", err));
  }, [companyId]);

  useEffect(() => {
    // Fetch applied students for each program once programs are updated
    if (programs.length > 0) {
      const fetchAppliedStudents = async () => {
        try {
          const appliedData = await Promise.all(
            programs.map((program) =>
              fetch(
                `http://localhost:9000/api/appliedStudents?programId=${program._id}`
              )
                .then((res) => {
                  if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                  }
                  return res.json();
                })
                .catch((err) => {
                  console.error(
                    "Error fetching applied students for program:",
                    err
                  );
                  return null; // Handle errors gracefully
                })
            )
          );
          setAppliedStudents(appliedData); // Filter out failed fetches
        } catch (err) {
          console.error("Error fetching applied students:", err);
        }
      };

      fetchAppliedStudents();
    }
  }, [programs]);

  const handleProgramChange = (e) => {
    const { name, value } = e.target;
    setNewProgram({ ...newProgram, [name]: value });
  };

  const handleAddProgram = () => {
    fetch("http://localhost:9000/api/trainingPrograms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyId, ...newProgram }),
    })
      .then(() => {
        alert("Program added successfully!");
        setNewProgram({
          title: "",
          description: "",
          venue: "",
          fromDate: "",
          toDate: "",
          time: "",
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Company Dashboard</h1>

      {/* Upload New Program */}
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Upload Training Program</h2>
        <input
          type="text"
          name="title"
          placeholder="Program Title"
          className="block w-full mb-3 p-2 border"
          value={newProgram.title}
          onChange={handleProgramChange}
        />
        <textarea
          name="description"
          placeholder="Program Description"
          className="block w-full mb-3 p-2 border"
          value={newProgram.description}
          onChange={handleProgramChange}
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          className="block w-full mb-3 p-2 border"
          value={newProgram.venue}
          onChange={handleProgramChange}
        />
        <label className="block mb-2 font-medium">From Date</label>
        <input
          type="date"
          name="fromDate"
          className="block w-full mb-3 p-2 border"
          value={newProgram.fromDate}
          onChange={handleProgramChange}
        />
        <label className="block mb-2 font-medium">To Date</label>
        <input
          type="date"
          name="toDate"
          className="block w-full mb-3 p-2 border"
          value={newProgram.toDate}
          onChange={handleProgramChange}
        />
        <input
          type="time"
          name="time"
          className="block w-full mb-3 p-2 border"
          value={newProgram.time}
          onChange={handleProgramChange}
        />
        <button
          onClick={handleAddProgram}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Program
        </button>
      </div>

      {/* View Applied Students */}
      <div className="mb-6 p-6 bg-gray-50 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Applied Students (Program-wise)
        </h2>
        {appliedStudents.map((students, programIndex) => (
          <div
            key={programIndex}
            className="mb-6 p-4 border bg-white rounded-lg shadow-md"
          >
            {/* Program Title */}
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              {programs[programIndex]?.title || "Unknown Program"}
            </h3>

            {/* Program Details */}
            <div className="text-gray-600 mb-3">
              <p className="mb-1">
                <span className="font-medium">Venue:</span>{" "}
                {programs[programIndex]?.venue || "N/A"}
              </p>
              <p className="mb-1">
                <span className="font-medium">Date:</span>{" "}
                {new Date(programs[programIndex]?.fromDate).toLocaleDateString() || "N/A"} to{" "}
                {new Date(programs[programIndex]?.toDate).toLocaleDateString() || "N/A"}
              </p>
              <p className="mb-1">
                <span className="font-medium">Time:</span>{" "}
                {programs[programIndex]?.time || "N/A"}
              </p>
            </div>

            {/* Applied Students List */}
            <div className="mt-4">
              {students.length > 0 ? (
                <ul className="space-y-2">
                  {students.map((student) => (
                    <li
                      key={student._id}
                      className="p-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm flex items-center gap-2"
                    >
                      <span className="inline-block w-8 h-8 bg-blue-500 text-white text-center font-bold rounded-full">
                        {student.studentId.slice(-2).toUpperCase()}
                      </span>
                      <span className="text-gray-700">
                        Student Name : {student.studentId}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  No students applied for this program.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View Programs */}
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Uploaded Programs</h2>
        <ul>
          {programs.map((program, index) => (
            <li key={index} className="mb-2">
              <strong>{program.title}</strong> - {new Date(program.date).toLocaleDateString()} at{" "}
              {program.time}
              <Link
                to={`/material-upload/${program._id}`}
                className="ml-4 text-blue-500"
              >
                Upload Materials
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrainingCompanyDashboard;

// [
//   [
//     {_id}
//   ],
//   [

//   ]
// ]
