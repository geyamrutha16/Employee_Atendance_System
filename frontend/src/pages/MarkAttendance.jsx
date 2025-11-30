import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { checkIn, checkOut } from "../features/attendance/attendanceSlice";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function MarkAttendance() {
  const dispatch = useDispatch();

  // FIX: SEPARATE loading states
  const [loadingIn, setLoadingIn] = useState(false);
  const [loadingOut, setLoadingOut] = useState(false);

  const [lastAction, setLastAction] = useState("");

  const extractMessage = (msg) => msg?.toString() || "Something went wrong";

  // CHECK IN ---------------------------------------------------
  const handleCheckIn = async () => {
    setLoadingIn(true);
    try {
      await dispatch(checkIn()).unwrap();
      setLastAction("You have checked in successfully!");
      toast.success("Checked In ✔");
    } catch (msg) {
      const error = extractMessage(msg);
      if (error.toLowerCase().includes("already")) {
        toast.error("Already checked in today!");
      } else {
        toast.error(error);
      }
    }
    setLoadingIn(false);
  };

  // CHECK OUT ---------------------------------------------------
  const handleCheckOut = async () => {
    setLoadingOut(true);
    try {
      await dispatch(checkOut()).unwrap();
      setLastAction("You have checked out successfully!");
      toast.success("Checked Out ✔");
    } catch (msg) {
      const error = extractMessage(msg);
      if (error.toLowerCase().includes("already")) {
        toast.error("Already checked out today!");
      } else if (error.toLowerCase().includes("not found")) {
        toast.error("Please check in before checking out.");
      } else {
        toast.error(error);
      }
    }
    setLoadingOut(false);
  };

  return (
    <>
      <Toaster />

      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background:
              "linear-gradient(135deg, #1976d2, #42a5f5), url('https://images.unsplash.com/photo-1581092335404-15d4d0f9f7b3?auto=format&fit=crop&w=1500&q=80')",
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Tap to Check In or Check Out 🕒
          </Typography>
        </Paper>

        {lastAction && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: "20px" }}
          >
            <Paper
              elevation={6}
              sx={{
                p: 2,
                textAlign: "center",
                borderLeft: "6px solid #4caf50",
                bgcolor: "rgba(76,175,80,0.1)",
              }}
            >
              <Typography fontWeight={600}>{lastAction}</Typography>
            </Paper>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 4,
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Mark Attendance
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* CHECK IN */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={loadingIn}
                  onClick={handleCheckIn}
                  sx={{
                    py: 1.8,
                    fontSize: "1.1rem",
                    borderRadius: 3,
                    background: "linear-gradient(45deg, #43a047, #66bb6a)",
                  }}
                >
                  {loadingIn ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "✅ Check In"
                  )}
                </Button>
              </motion.div>

              {/* CHECK OUT */}
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  disabled={loadingOut}
                  onClick={handleCheckOut}
                  sx={{
                    py: 1.8,
                    fontSize: "1.1rem",
                    borderRadius: 3,
                    borderWidth: 2,
                    color: "#e53935",
                    borderColor: "#e53935",
                  }}
                >
                  {loadingOut ? <CircularProgress size={24} /> : "❌ Check Out"}
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </>
  );
}
