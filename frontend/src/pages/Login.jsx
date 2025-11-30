import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async () => {
    // Validate empty fields
    if (!form.email.trim() || !form.password.trim()) {
      return toast.error("Please fill in all fields");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return toast.error("Please enter a valid email address");
    }

    setLoading(true);

    try {
      const res = await dispatch(login(form)).unwrap();
      toast.success("Login successful! Welcome back!");
      nav(res.user.role === "manager" ? "/manager" : "/");
    } catch (err) {
      // Handle different error messages from backend
      if (err.includes("Invalid credentials")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (err.includes("Email and password are required")) {
        toast.error("Please enter both email and password");
      } else if (err.includes("User not found")) {
        toast.error("No account found with this email");
      } else {
        toast.error(err || "Login failed. Please try again.");
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
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          backdropFilter: "blur(8px)",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 3 }}
        >
          Welcome Back 👋
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onKeyPress={handleKeyPress}
            fullWidth
            disabled={loading}
          />

          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyPress={handleKeyPress}
            fullWidth
            disabled={loading}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ py: 1.4, fontSize: "1rem" }}
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
