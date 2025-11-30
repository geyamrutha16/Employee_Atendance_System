// src/pages/TeamCalendar.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material";

import API from "../api/axiosInstance";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function TeamCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedDayRecords, setSelectedDayRecords] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // ------------------ LOAD MONTH SUMMARY ------------------
  const loadMonthSummary = async (monthStr) => {
    try {
      const res = await API.get("/attendance/calendar-summary", {
        params: { month: monthStr },
      });

      const data = res.data || {};
      const eventList = [];

      Object.keys(data).forEach((date) => {
        const d = data[date];

        eventList.push({
          title: `P:${d.present} L:${d.late} A:${d.absent}`,
          date: date,
          backgroundColor: "#1976d2",
          borderColor: "#115293",
          textColor: "white",
        });
      });

      setEvents(eventList);
    } catch (err) {
      console.log(err);
    }
  };

  // ------------------ WHEN MONTH CHANGES IN CALENDAR ------------------
  const handleMonthChange = (info) => {
    const year = info.view.currentStart.getFullYear();
    const month = String(info.view.currentStart.getMonth() + 1).padStart(
      2,
      "0"
    );

    const monthStr = `${year}-${month}`;
    loadMonthSummary(monthStr);
  };

  // ------------------ DAY CLICK = SHOW EMPLOYEE RECORDS ------------------
  const handleDateClick = async (info) => {
    try {
      const res = await API.get(`/attendance/by-date/${info.dateStr}`);
      setSelectedDayRecords(res.data || []);
      setOpenModal(true);
    } catch (err) {
      console.log(err);
      setSelectedDayRecords([]);
      setOpenModal(true);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* ------------------ HEADER ------------------ */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%), url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1500&q=80')",
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Team Calendar View 📅
        </Typography>
        <Typography variant="subtitle1">
          Click any day to view detailed attendance.
        </Typography>
      </Paper>

      {/* ------------------ CALENDAR ------------------ */}
      <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="85vh"
          events={events}
          datesSet={handleMonthChange}
          dateClick={handleDateClick}
        />
      </Paper>

      {/* ------------------ MODAL ------------------ */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Attendance Details</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Emp ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Check-In</TableCell>
                <TableCell>Check-Out</TableCell>
                <TableCell>Hours</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedDayRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No records for this day
                  </TableCell>
                </TableRow>
              ) : (
                selectedDayRecords.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>{r.userId?.employeeId}</TableCell>
                    <TableCell>{r.userId?.name}</TableCell>

                    <TableCell>
                      <Chip
                        label={r.status.toUpperCase()}
                        color={
                          r.status === "present"
                            ? "success"
                            : r.status === "late"
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>

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

                    <TableCell>{r.totalHours}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
