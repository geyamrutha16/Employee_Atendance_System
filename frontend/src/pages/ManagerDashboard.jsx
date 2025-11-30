import React, { useEffect, useState } from "react";
import { Container, Paper, Button, TextField } from "@mui/material";
import API from "../api/axiosInstance";

export default function ManagerDashboard() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState({
    employeeId: "",
    date: "",
    status: "",
  });

  const fetchAll = async () => {
    const res = await API.get("/attendance/all", { params: filter });
    setRecords(res.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 2 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <TextField
            label="Employee ID"
            value={filter.employeeId}
            onChange={(e) =>
              setFilter({ ...filter, employeeId: e.target.value })
            }
          />
          <TextField
            label="Date (YYYY-MM-DD)"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          />
          <TextField
            label="Status"
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          />
          <Button variant="contained" onClick={fetchAll}>
            Filter
          </Button>
          <Button
            variant="outlined"
            onClick={async () => {
              const res = await API.get(
                "/attendance/export"
              ); /* download handled by browser */
            }}
          >
            Export CSV
          </Button>
        </div>
        <div>
          {records.map((r) => (
            <div key={r._id}>
              {r.date} - {r.userId?.employeeId} - {r.userId?.name} - {r.status}
            </div>
          ))}
        </div>
      </Paper>
    </Container>
  );
}
