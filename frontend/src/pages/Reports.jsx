import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
} from "@mui/material";
import API from "../api/axiosInstance";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Reports() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);

  const [filter, setFilter] = useState({
    employeeId: "",
    from: "",
    to: "",
  });

  const loadEmployees = async () => {
    try {
      const res = await API.get("/users/employees");
      setEmployees(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const loadReport = async () => {
    try {
      const res = await API.get("/reports", { params: filter });
      setRecords(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const exportCSV = async () => {
    try {
      const res = await API.get("/attendance/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "attendance_report.csv");
      link.click();

      toast.success("CSV downloaded");
    } catch (err) {
      toast.error("Export failed");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

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
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Attendance Reports 📄
        </Typography>
        <Typography>Generate detailed attendance reports.</Typography>
      </Paper>

      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Select Employee"
              value={filter.employeeId}
              onChange={(e) =>
                setFilter({ ...filter, employeeId: e.target.value })
              }
            >
              <MenuItem value="">All</MenuItem>
              {employees.map((e) => (
                <MenuItem key={e._id} value={e.employeeId}>
                  {e.name} ({e.employeeId})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              type="date"
              fullWidth
              label="From"
              InputLabelProps={{ shrink: true }}
              value={filter.from}
              onChange={(e) => setFilter({ ...filter, from: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              type="date"
              fullWidth
              label="To"
              InputLabelProps={{ shrink: true }}
              value={filter.to}
              onChange={(e) => setFilter({ ...filter, to: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={loadReport}
              sx={{ height: "56px" }}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={4} sx={{ mt: 4, p: 3 }}>
        <Button variant="outlined" onClick={exportCSV}>
          Export CSV
        </Button>

        <TableContainer sx={{ mt: 2, maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "Date",
                  "Emp ID",
                  "Name",
                  "Status",
                  "Check In",
                  "Check Out",
                  "Hours",
                ].map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {records.map((r, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.userId?.employeeId}</TableCell>
                  <TableCell>{r.userId?.name}</TableCell>

                  <TableCell>
                    <Chip
                      label={r.status}
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
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
