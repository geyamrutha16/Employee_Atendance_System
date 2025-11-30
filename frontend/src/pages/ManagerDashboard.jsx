import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  Box,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";

import API from "../api/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";

// Icons
const icons = {
  total: "👥",
  present: "🟩",
  late: "🟧",
  absent: "🟥",
};

function useDebounce(callback, delay) {
  const fn = useCallback(() => {
    clearTimeout(fn.timer);
    fn.timer = setTimeout(callback, delay);
  }, [callback, delay]);
  return fn;
}

export default function ManagerDashboard() {
  const [summary, setSummary] = useState({});
  const [trend, setTrend] = useState([]);
  const [departmentSummary, setDepartmentSummary] = useState([]);
  const [records, setRecords] = useState([]);

  const [filter, setFilter] = useState({
    employeeId: "",
    date: "",
    status: "",
  });

  const [month, setMonth] = useState("");

  const handleExport = async () => {
    try {
      const res = await API.get("/attendance/export", { responseType: "blob" });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "attendance_report.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("CSV Export failed:", err);
    }
  };

  const loadStats = async () => {
    try {
      const url = month
        ? `/dashboard/stats?month=${month}`
        : "/dashboard/stats";

      const res = await API.get(url);
      setSummary(res.data || {});
    } catch {}
  };

  const loadTrend = async () => {
    try {
      const url = month
        ? `/dashboard/monthly-trend?month=${month}`
        : "/dashboard/monthly-trend";

      const res = await API.get(url);

      const data = res.data || {};
      const formatted = Object.keys(data).map((day) => ({
        day,
        present: data[day]?.present || 0,
        late: data[day]?.late || 0,
        absent: data[day]?.absent || 0,
      }));
      setTrend(formatted);
    } catch {
      setTrend([]);
    }
  };

  const loadDepartments = async () => {
    try {
      const url = month
        ? `/dashboard/department-summary?month=${month}`
        : "/dashboard/department-summary";

      const res = await API.get(url);
      const data = res.data || {};

      const formatted = Object.keys(data).map((dept) => ({
        name: dept,
        present: data[dept]?.present || 0,
        late: data[dept]?.late || 0,
      }));

      setDepartmentSummary(formatted);
    } catch {
      setDepartmentSummary([]);
    }
  };

  const loadAll = async () => {
    try {
      const res = await API.get("/attendance/all", { params: filter });
      setRecords(res.data || []);
    } catch {
      setRecords([]);
    }
  };

  const debouncedFilter = useDebounce(loadAll, 300);
  useEffect(() => {
    debouncedFilter();
  }, [filter]);

  useEffect(() => {
    loadStats();
    loadTrend();
    loadDepartments();
    loadAll();
  }, []);

  useEffect(() => {
    loadStats();
    loadTrend();
    loadDepartments();
  }, [month]);

  const cardItems = [
    {
      label: "Total Employees",
      value: summary.totalEmployees || 0,
      color: "#1976d2",
      icon: icons.total,
    },
    {
      label: "Present Today",
      value: summary.presentToday || 0,
      color: "#4caf50",
      icon: icons.present,
    },
    {
      label: "Late Today",
      value: summary.lateToday || 0,
      color: "#fb8c00",
      icon: icons.late,
    },
    {
      label: "Absent Today",
      value: summary.absentToday || 0,
      color: "#e53935",
      icon: icons.absent,
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
          background:
            "linear-gradient(135deg, #1976d2, #42a5f5), url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1500&q=80')",
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Manager Dashboard 📊
        </Typography>
        <Typography variant="subtitle1">
          Monitor workforce attendance, trends & department performance.
        </Typography>
      </Paper>

      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          View Monthly Report 📅
        </Typography>

        <TextField
          type="month"
          label="Select Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{ width: 250 }}
        />
      </Paper>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cardItems.map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.75)",
                  borderLeft: `6px solid ${card.color}`,
                }}
              >
                <Typography variant="h4">
                  {card.icon} {card.value}
                </Typography>
                <Typography variant="subtitle1">{card.label}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 2, height: 350 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Monthly Attendance Trend
            </Typography>

            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={trend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line dataKey="present" stroke="#4caf50" />
                <Line dataKey="late" stroke="#fb8c00" />
                <Line dataKey="absent" stroke="#e53935" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 2, height: 350 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Department Summary
            </Typography>

            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={departmentSummary}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#4caf50" />
                <Bar dataKey="late" fill="#fb8c00" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={4}
        sx={{
          p: 3,
          mt: 4,
          borderRadius: 3,
          background: "rgba(255,255,255,0.9)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filter Records 🔍
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Employee ID"
              fullWidth
              value={filter.employeeId}
              onChange={(e) =>
                setFilter({ ...filter, employeeId: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              label="Date (YYYY-MM-DD)"
              fullWidth
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Status"
              fullWidth
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="present">Present</MenuItem>
              <MenuItem value="late">Late</MenuItem>
              <MenuItem value="absent">Absent</MenuItem>
              <MenuItem value="half-day">Half Day</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{ height: "56px" }}
              onClick={loadAll}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={4} sx={{ p: 3, mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6">All Attendance Records 📁</Typography>

          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            sx={{
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              color: "white",
            }}
          >
            Export CSV
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                {[
                  "Date",
                  "Emp ID",
                  "Name",
                  "Status",
                  "Check-In",
                  "Check-Out",
                  "Hours",
                ].map((h) => (
                  <TableCell sx={{ color: "white" }} key={h}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textAlign: "center", py: 6 }}
                    >
                      🔍 No matching records found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                records.map((r, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <TableCell>{r.date}</TableCell>
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

                    <TableCell>{r.totalHours || 0}</TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
