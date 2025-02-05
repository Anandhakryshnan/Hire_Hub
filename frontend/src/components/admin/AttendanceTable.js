import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";

const AttendanceTable = () => {
  const { programId } = useParams(); // Get programId from the URL parameters
  const [attendanceData, setAttendanceData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState("semester");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch attendance data for the given programId
  useEffect(() => {
    if (programId) {
      fetch(`/api/attendance/${programId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching attendance data");
          }
          return response.json();
        })
        .then((data) => {
          setAttendanceData(data.attendance || []);
          setSortedData(data.attendance || []);
        })
        .catch((error) => console.error("Error fetching attendance data:", error));
    }
  }, [programId]);

  // Sort data by a specific key
  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...attendanceData].sort((a, b) => {
      if (order === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setSortedData(sorted);
    setSortKey(key);
    setSortOrder(order);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Attendance Report
        </h1>

        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">Sort by:</p>
          <div className="space-x-2">
            <button
              className={`py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 ${
                sortKey === "semester" ? "font-bold" : ""
              }`}
              onClick={() => handleSort("semester")}
            >
              Semester
            </button>
            <button
              className={`py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 ${
                sortKey === "department" ? "font-bold" : ""
              }`}
              onClick={() => handleSort("department")}
            >
              Department
            </button>
            <button
              className={`py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 ${
                sortKey === "name" ? "font-bold" : ""
              }`}
              onClick={() => handleSort("name")}
            >
              Name
            </button>
          </div>
          <CSVLink
            data={sortedData}
            filename={`attendance-report-${programId}.csv`}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Download Report
          </CSVLink>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Roll Number</th>
                <th
                  className="py-3 px-6 text-left cursor-pointer"
                  onClick={() => handleSort("semester")}
                >
                  Semester {sortKey === "semester" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="py-3 px-6 text-left cursor-pointer"
                  onClick={() => handleSort("department")}
                >
                  Department {sortKey === "department" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th className="py-3 px-6 text-left">Attendance</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {sortedData.length > 0 ? (
                sortedData.map((record) => (
                  <tr
                    key={record._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{record.studentId}</td>
                    <td className="py-3 px-6 text-left">{record.studentId}</td>
                    <td className="py-3 px-6 text-left">{record.semester}</td>
                    <td className="py-3 px-6 text-left">{record.department}</td>
                    <td className="py-3 px-6 text-left">{record.attendance}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500 font-medium"
                  >
                    No attendance records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
