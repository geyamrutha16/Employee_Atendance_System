import React from "react";
import { Container, Paper, Button, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { checkIn, checkOut } from "../features/attendance/attendanceSlice";

export default function MarkAttendance() {
  const dispatch = useDispatch();

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6">Mark Attendance</Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="contained" onClick={() => dispatch(checkIn())}>
            Check In
          </Button>
          <Button variant="outlined" onClick={() => dispatch(checkOut())}>
            Check Out
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
