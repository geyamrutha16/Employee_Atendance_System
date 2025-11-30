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

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await dispatch(login(form)).unwrap();
      nav(res.user.role === "manager" ? "/manager" : "/");
    } catch (err) {
      alert(err.message || "Login failed");
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
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            fullWidth
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ py: 1.4, fontSize: "1rem" }}
            onClick={submit}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
