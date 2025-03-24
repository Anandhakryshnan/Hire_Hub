import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import BgColorAnimation from "../../animations/BgColorAnimation";

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
    fetch(`${process.env.REACT_APP_API_URL}/api/trainingPrograms?companyId=${companyId}`)
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
                `${process.env.REACT_APP_API_URL}/api/appliedStudents?programId=${program._id}`
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
    fetch(`${process.env.REACT_APP_API_URL}/api/trainingPrograms`, {
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
    <BgColorAnimation
      child={
        <div className="w-full h-screen overflow-y-auto">
          <div className="h-full overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 pt-[6rem]">
            {/* New Program Card */}
            <AnimatedGradientBorderTW>
              <div className="bg-[#131219] p-6 rounded-lg">
                <h2 className="text-xl font-bold text-violet-400 mb-4">
                  New Training Program
                </h2>
                <div className="space-y-4">
                  <InputField
                    label="Title"
                    name="title"
                    value={newProgram.title}
                    onChange={handleProgramChange}
                  />
                  <InputField
                    label="Description"
                    name="description"
                    textarea
                    value={newProgram.description}
                    onChange={handleProgramChange}
                  />
                  <InputField
                    label="Venue"
                    name="venue"
                    value={newProgram.venue}
                    onChange={handleProgramChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="From Date"
                      name="fromDate"
                      type="date"
                      value={newProgram.fromDate}
                      onChange={handleProgramChange}
                    />
                    <InputField
                      label="To Date"
                      name="toDate"
                      type="date"
                      value={newProgram.toDate}
                      onChange={handleProgramChange}
                    />
                  </div>
                  <InputField
                    label="Time"
                    name="time"
                    type="time"
                    value={newProgram.time}
                    onChange={handleProgramChange}
                  />
                  <button
                    onClick={handleAddProgram}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Create Program
                  </button>
                </div>
              </div>
            </AnimatedGradientBorderTW>

            {/* Current Programs Card */}
            <AnimatedGradientBorderTW>
              <div className="bg-[#131219] p-6 rounded-lg">
                <h2 className="text-xl font-bold text-violet-400 mb-4">
                  Active Programs
                </h2>
                <div className="space-y-4">
                  {programs.map((program, index) => (
                    <div
                      key={index}
                      className="border-b border-slate-700 pb-4 last:border-b-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-cyan-200">
                            {program.title}
                          </h3>
                          <p className="text-sm text-slate-400 mt-1">
                            {new Date(program.fromDate).toLocaleDateString()} -{" "}
                            {new Date(program.toDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Link
                          to={`/material-upload/${program._id}`}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-md text-sm text-violet-300"
                        >
                          Upload Materials
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedGradientBorderTW>

            {/* Applications Card */}
            <AnimatedGradientBorderTW>
              <div className="bg-[#131219] p-6 rounded-lg lg:col-span-2">
                <h2 className="text-xl font-bold text-violet-400 mb-4">
                  Student Applications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {appliedStudents.map((students, programIndex) => (
                    <div
                      key={programIndex}
                      className="bg-slate-800 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-cyan-200">
                          {programs[programIndex]?.title || "Unnamed Program"}
                        </h3>
                        <span className="text-sm bg-indigo-900 text-indigo-300 px-2 py-1 rounded">
                          {students.length} applicants
                        </span>
                      </div>

                      <div className="space-y-3">
                        {students.length > 0 ? (
                          students.map((student) => (
                            <div
                              key={student._id}
                              className="flex items-center p-3 bg-slate-900 rounded-md"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
                                {student.name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-cyan-200">
                                  {student.name}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {student.email}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-slate-500">
                            No applications yet
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedGradientBorderTW>
          </div>
        </div>
      }
    />
  );
};

const InputField = ({ label, textarea = false, ...props }) => (
  <div>
    <label className="block text-sm text-cyan-300 mb-1">{label}</label>
    {textarea ? (
      <textarea
        className="w-full bg-slate-800 text-cyan-200 rounded-lg p-2 border border-slate-700 focus:border-violet-500 outline-none"
        rows="3"
        {...props}
      />
    ) : (
      <input
        className="w-full bg-slate-800 text-cyan-200 rounded-lg p-2 border border-slate-700 focus:border-violet-500 outline-none"
        {...props}
      />
    )}
  </div>
);

// Keep all NavBar and related components from reference
// Include AnimatedGradientBorderTW, NavBar, Chip, AnimatedHamburgerButton,
// Option, FlyoutLink, userActions, etc. exactly as in reference

export default TrainingCompanyDashboard;

const AnimatedGradientBorderTW = ({ children }) => {
  const boxRef = useRef(null);

  useEffect(() => {
    const boxElement = boxRef.current;

    if (!boxElement) return;

    const updateAnimation = () => {
      const angle =
        (parseFloat(boxElement.style.getPropertyValue("--angle")) + 0.5) % 360;
      boxElement.style.setProperty("--angle", `${angle}deg`);
      requestAnimationFrame(updateAnimation);
    };

    requestAnimationFrame(updateAnimation);
  }, []);

  return (
    <div
      style={{
        "--angle": "0deg",
        "--border-color": "linear-gradient(var(--angle), #070707, #687aff)",
        "--bg-color": "linear-gradient(#131219, #131219)",
      }}
      className="flex items-center justify-center rounded-lg border-2 border-[#0000] p-3 [background:padding-box_var(--bg-color),border-box_var(--border-color)]"
      ref={boxRef}
    >
      {children}
    </div>
  );
};
