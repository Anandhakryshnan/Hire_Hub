import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const AttendanceTable = () => {
  const { programId } = useParams(); // Get programId from the URL parameters
  const [attendanceData, setAttendanceData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortKey, setSortKey] = useState("semester");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch attendance data for the given programId
  useEffect(() => {
    if (programId) {
      fetch(`${process.env.REACT_APP_API_URL}/api/attendance/${programId}`)
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
    <div>
      <div className="text-center mt-3 font-robotoMono text-2xl font-bold text-slate-800">
        Attendance Report
      </div>

      <div className="flex justify-center mt-5">
        <TableContainer
          component={Paper}
          sx={{
            margin: "10px",
            width: "95%",
            borderBottom: "1px solid black",
            backgroundColor: "#EFFDF5",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#216C34",
                  fontSize: "16px",
                }}
              >
                {["Name", "Phone", "Email", "Semester", "Department"].map((cell, indx) => (
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      border: "2px solid #3E8C5F",
                      cursor: "pointer",
                    }}
                    key={indx}
                    onClick={() => handleSort(cell.toLowerCase())}
                  >
                    <span className="text-green-800">
                      {cell} {sortKey === cell.toLowerCase() && (sortOrder === "asc" ? "▲" : "▼")}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody sx={{ color: "black" }}>
              {sortedData.length > 0 ? (
                sortedData.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.phone}</TableCell>
                    <TableCell>{record.email}</TableCell>
                    <TableCell>{record.semester}</TableCell>
                    <TableCell>{record.department}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="text-center py-4 text-gray-500 font-medium">
                    No attendance records available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="flex justify-center mt-4">
        <CSVLink
          data={sortedData}
          filename={`attendance-report-${programId}.csv`}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Download Report
        </CSVLink>
      </div>
    </div>
  );
};

export default AttendanceTable;