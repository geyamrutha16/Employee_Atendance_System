import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  MenuItem,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: "",
    department: "",
    role: "employee",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!form.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!form.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (!form.employeeId.trim()) {
      toast.error("Employee ID is required");
      return false;
    }
    if (!form.department.trim()) {
      toast.error("Department is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const submit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log("🔄 Attempting registration...", form);
      const res = await dispatch(register(form)).unwrap();
      console.log("✅ Registration successful:", res);
      toast.success("Account created successfully! Welcome!");
      nav(res.user.role === "manager" ? "/manager" : "/");
    } catch (err) {
      console.log("❌ Registration error:", err);

      // Handle different error messages from backend
      if (err?.includes("Email already exists")) {
        toast.error(
          "An account with this email already exists. Please use a different email."
        );
      } else if (err?.includes("Employee ID already exists")) {
        toast.error(
          "This Employee ID is already registered. Please use a different ID."
        );
      } else if (err?.includes("All fields are required")) {
        toast.error("Please fill in all required fields.");
      } else if (err?.includes("User already exists")) {
        toast.error("User already exists. Please try logging in.");
      } else {
        toast.error(err || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Create Account ✨
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name *"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Email *"
              type="email"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Password *"
              type="password"
              fullWidth
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyPress={handleKeyPress}
              helperText="Must be at least 6 characters"
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Employee ID *"
              fullWidth
              value={form.employeeId}
              onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Department *"
              fullWidth
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Role *"
              fullWidth
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              disabled={loading}
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{ py: 1.4, fontSize: "1rem", mt: 2 }}
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
