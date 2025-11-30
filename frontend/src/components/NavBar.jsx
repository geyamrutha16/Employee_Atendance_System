import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function NavBar() {
    const auth = useSelector(s => s.auth);
    const dispatch = useDispatch();
    const nav = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>Attendance</Typography>
                {auth.user ? (
                    <>
                        <Button color="inherit" component={Link} to="/">Dashboard</Button>
                        <Button color="inherit" component={Link} to="/mark">Mark</Button>
                        <Button color="inherit" component={Link} to="/history">History</Button>
                        {auth.user.role === 'manager' && <Button color="inherit" component={Link} to="/manager">Manager</Button>}
                        <Button color="inherit" onClick={() => { dispatch(logout()); nav('/login'); }}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
