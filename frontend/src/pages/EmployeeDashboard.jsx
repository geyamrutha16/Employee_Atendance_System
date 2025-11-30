import React, { useEffect } from "react";
import { Container, Paper, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHistory,
  fetchSummary,
} from "../features/attendance/attendanceSlice";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const summary = useSelector((s) => s.attendance.summary);
  const records = useSelector((s) => s.attendance.records);

  useEffect(() => {
    dispatch(fetchSummary());
    dispatch(fetchHistory());
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">This month</Typography>
            <Typography>Present: {summary.present || 0}</Typography>
            <Typography>Absent: {summary.absent || 0}</Typography>
            <Typography>Late: {summary.late || 0}</Typography>
            <Typography>Total Hours: {summary.totalHours || 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Recent Attendance</Typography>
            {records.slice(0, 7).map((r) => (
              <div key={r._id}>
                <strong>{r.date}</strong> — {r.status} — {r.totalHours || 0}h
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
