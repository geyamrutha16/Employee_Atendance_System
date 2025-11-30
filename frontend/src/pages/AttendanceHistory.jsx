import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../features/attendance/attendanceSlice";

export default function AttendanceHistory() {
  const dispatch = useDispatch();
  const records = useSelector((s) => s.attendance.records);

  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }} fontWeight={600}>
          Attendance History
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ color: "white" }}>Date</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell sx={{ color: "white" }}>Check-In</TableCell>
                <TableCell sx={{ color: "white" }}>Check-Out</TableCell>
                <TableCell sx={{ color: "white" }}>Hours</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.map((r) => (
                <TableRow hover key={r._id}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell>
                    {r.checkInTime
                      ? new Date(r.checkInTime).toLocaleTimeString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {r.checkOutTime
                      ? new Date(r.checkOutTime).toLocaleTimeString()
                      : "-"}
                  </TableCell>
                  <TableCell>{r.totalHours || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
