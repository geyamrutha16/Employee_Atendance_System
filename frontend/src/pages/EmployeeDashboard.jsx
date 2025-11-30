import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Avatar,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHistory,
  fetchSummary,
} from "../features/attendance/attendanceSlice";
import { motion } from "framer-motion";

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const summary = useSelector((s) => s.attendance.summary);
  const records = useSelector((s) => s.attendance.records);

  const [month, setMonth] = useState("");

  useEffect(() => {
    dispatch(fetchSummary());
    dispatch(fetchHistory());
  }, []);

  useEffect(() => {
    if (month === "") return;
    dispatch(fetchSummary(month));
  }, [month]);

  const cards = [
    {
      label: "Present",
      value: summary.present || 0,
      color: "#4caf50",
      icon: "🟩",
    },
    {
      label: "Absent",
      value: summary.absent || 0,
      color: "#e53935",
      icon: "🟥",
    },
    {
      label: "Late",
      value: summary.late || 0,
      color: "#fb8c00",
      icon: "🟧",
    },
    {
      label: "Total Hours",
      value: summary.totalHours || 0,
      color: "#1e88e5",
      icon: "💼",
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)`,
          color: "white",
          backgroundImage: `url("https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1350&q=80")`,
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Welcome Back 👋
        </Typography>
        <Typography variant="subtitle1">
          Here’s a quick look at your attendance performance.
        </Typography>
      </Paper>

      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          View Monthly Summary 📅
        </Typography>

        <TextField
          type="month"
          label="Select Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{ width: 250 }}
        />
      </Paper>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(8px)",
                  borderLeft: `6px solid ${card.color}`,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 10,
                    background: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                <Typography variant="h3" fontWeight="700">
                  {card.icon} {card.value}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 1 }}
                  color="text.secondary"
                >
                  {card.label}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12} sx={{ mt: 4 }}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Recent Attendance
          </Typography>

          {records.slice(0, 7).map((r, index) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1.5,
                  px: 1,
                  borderBottom: "1px solid #eee",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor:
                        r.status === "present"
                          ? "#4caf50"
                          : r.status === "late"
                          ? "#fb8c00"
                          : "#e53935",
                    }}
                  >
                    {r.status === "present"
                      ? "P"
                      : r.status === "late"
                      ? "L"
                      : "A"}
                  </Avatar>

                  <Typography fontWeight={600}>{r.date}</Typography>
                </Box>

                <Chip
                  label={r.status.toUpperCase()}
                  color={
                    r.status === "present"
                      ? "success"
                      : r.status === "late"
                      ? "warning"
                      : "error"
                  }
                  variant="filled"
                />

                <Typography>{r.totalHours || 0} hrs</Typography>
              </Box>
            </motion.div>
          ))}
        </Paper>
      </Grid>
    </Container>
  );
}
