import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
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
      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Total Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((r) => (
              <TableRow key={r._id}>
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
                <TableCell>{r.totalHours || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
