import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const TrainingCompanyDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [appliedStudents, setAppliedStudents] = useState([]);
  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate();

  // Fetch training programs and applied students data
  useEffect(() => {
    fetch("http://localhost:9000/api/trainingPrograms")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:9000/api/appliedStudents")
      .then((res) => res.json())
      .then((data) => setAppliedStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleProgramChange = (e) => {
    const { name, value } = e.target;
    setNewProgram({ ...newProgram, [name]: value });
  };

  const handleAddProgram = () => {
    const companyId = localStorage.getItem("token");
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
          date: "",
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
        <input
          type="date"
          name="date"
          className="block w-full mb-3 p-2 border"
          value={newProgram.date}
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
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Applied Students</h2>
        <ul>
          {appliedStudents.map((student, index) => (
            <li key={index} className="mb-2">
              {student.studentId}
            </li>
          ))}
        </ul>
      </div>

      {/* View Programs */}
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Uploaded Programs</h2>
        <ul>
          {programs.map((program, index) => (
            <li key={index} className="mb-2">
              <strong>{program.title}</strong> - {program.date} at{" "}
              {program.time}
              <Link to={`/material-upload/${program._id}`} className="ml-4 text-blue-500">
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
