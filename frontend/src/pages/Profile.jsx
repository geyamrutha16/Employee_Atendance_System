import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import API from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function Profile() {
  const user = useSelector((s) => s.auth.user);

  const [form, setForm] = useState({
    name: user?.name || "",
    department: user?.department || "",
    password: "",
  });

  const handleUpdate = async () => {
    try {
      const res = await API.put("/auth/update-profile", form);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, #1976d2, #42a5f5), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1350&q=80')",
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          My Profile 👤
        </Typography>
        <Typography variant="subtitle1">
          Manage your personal details.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
            {user?.name?.charAt(0)}
          </Avatar>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Employee ID"
              value={user?.employeeId}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Department"
              fullWidth
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField label="Email" value={user?.email} fullWidth disabled />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="password"
              label="New Password (optional)"
              fullWidth
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          fullWidth
          onClick={handleUpdate}
        >
          Update Profile
        </Button>
      </Paper>
    </Container>
  );
}
