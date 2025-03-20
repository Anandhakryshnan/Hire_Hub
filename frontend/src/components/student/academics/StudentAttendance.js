import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { CSVLink } from "react-csv";

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const studentId = localStorage.getItem("token");

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/student/attendance/${studentId}`)
      .then((response) => {
        setAttendance(response.data.attendance);
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
      });
  }, [studentId]);

  return (
    <div>
      {/* Title */}
      <div className="text-center mt-3 font-robotoMono text-2xl font-bold text-slate-800">
        Attendance Report
      </div>

      {/* Attendance Table */}
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
              <TableRow sx={{ backgroundColor: "#216C34" }}>
                {["Program", "Date", "Status"].map((cell, indx) => (
                  <TableCell
                    key={indx}
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      border: "2px solid #3E8C5F",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {attendance.length > 0 ? (
                attendance.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {record.programId ? record.programId.title : "Unknown Program"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {new Date(record.markedAt).toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      ✅ Present
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3" className="text-center py-4 text-gray-500 font-medium">
                    No attendance records available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* CSV Download Button */}
      <div className="flex justify-center mt-4">
        <CSVLink
          data={attendance}
          filename={`attendance-report-${studentId}.csv`}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Download Report
        </CSVLink>
      </div>
    </div>
  );
};

export default StudentAttendance;
