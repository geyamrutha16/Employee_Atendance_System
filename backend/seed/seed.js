const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const bcrypt = require('bcryptjs');

dotenv.config();

const seed = async () => {
    await connectDB(process.env.MONGO_URI);

    console.log("Clearing old data...");
    await User.deleteMany();
    await Attendance.deleteMany();

    const pass = await bcrypt.hash('password123', 10);

    const users = [
        // -------- Batch 0 --------
        { name: 'Alice Employee', email: 'alice@example.com', password: pass, role: 'employee', employeeId: 'EMP001', department: 'Engineering' },
        { name: 'Bob Employee', email: 'bob@example.com', password: pass, role: 'employee', employeeId: 'EMP002', department: 'Design' },
        { name: 'Mngr One', email: 'manager@example.com', password: pass, role: 'manager', employeeId: 'MGR001', department: 'Management' },

        // -------- Batch 1 --------
        { name: '1Alice Employee', email: '1alice@example.com', password: pass, role: 'employee', employeeId: 'EMP003', department: 'Engineering' },
        { name: '1Bob Employee', email: '1bob@example.com', password: pass, role: 'employee', employeeId: 'EMP004', department: 'Design' },
        { name: '1Mngr One', email: '1manager@example.com', password: pass, role: 'manager', employeeId: 'MGR005', department: 'Management' },

        // -------- Batch 2 --------
        { name: '2Alice Employee', email: '2alice@example.com', password: pass, role: 'employee', employeeId: 'EMP006', department: 'Engineering' },
        { name: '2Bob Employee', email: '2bob@example.com', password: pass, role: 'employee', employeeId: 'EMP007', department: 'Design' },
        { name: '2Mngr One', email: '2manager@example.com', password: pass, role: 'manager', employeeId: 'MGR008', department: 'Management' },

        // -------- Batch 3 --------
        { name: '3Alice Employee', email: '3alice@example.com', password: pass, role: 'employee', employeeId: 'EMP009', department: 'Engineering' },
        { name: '3Bob Employee', email: '3bob@example.com', password: pass, role: 'employee', employeeId: 'EMP010', department: 'Design' },
        { name: '3Mngr One', email: '3manager@example.com', password: pass, role: 'manager', employeeId: 'MGR010', department: 'Management' }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Users created successfully');

    // Sample attendance for last 7 days for Alice (EMP001)
    const alice = createdUsers.find(u => u.employeeId === 'EMP001');

    const attendanceRecords = [];

    for (let i = 6; i >= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);

        const dateStr = day.toISOString().slice(0, 10);

        const checkIn = new Date(dateStr + "T09:00:00");
        const checkOut = new Date(dateStr + "T18:00:00");

        attendanceRecords.push({
            userId: alice._id,
            date: dateStr,
            checkInTime: checkIn,
            checkOutTime: checkOut,
            status: 'present',
            totalHours: 9
        });
    }

    await Attendance.insertMany(attendanceRecords);
    console.log('Attendance records created successfully');

    process.exit(0);
};

seed().catch(err => console.log(err));
