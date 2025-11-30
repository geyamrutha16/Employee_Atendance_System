import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "../ThemeContext";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function NavBar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const menuItems = [
    { label: "Dashboard", link: "/" },
    { label: "Mark Attendance", link: "/mark" },
    { label: "History", link: "/history" },
    { label: "Profile", link: "/profile" },

    ...(auth.user?.role === "manager"
      ? [
          { label: "Manager", link: "/manager" },
          { label: "Team Calendar", link: "/manager/calendar" },
          { label: "Reports", link: "/manager/reports" },
        ]
      : []),
  ];

  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
  };

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "30px !important",
            px: "15px !important",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
            Attendance
          </Typography>

          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.link}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    py: 0.5,
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <IconButton
                onClick={() => colorMode.toggleColorMode()}
                sx={{ color: "white", p: "6px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </IconButton>

              {auth.user ? (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    textTransform: "none",
                    fontSize: "0.9rem",
                    py: 0.3,
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    sx={{ textTransform: "none", py: 0.3 }}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                    sx={{ textTransform: "none", py: 0.3 }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <IconButton
              color="inherit"
              onClick={() => setOpen(true)}
              sx={{ p: "6px" }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: "70vw", p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menu
          </Typography>

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.label}
                component={Link}
                to={item.link}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}

            <ListItemButton
              onClick={() => {
                colorMode.toggleColorMode();
                setOpen(false);
              }}
            >
              <ListItemText primary="Toggle Theme" />
            </ListItemButton>

            {auth.user ? (
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            ) : (
              <>
                <ListItemButton
                  component={Link}
                  to="/login"
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/register"
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary="Register" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
