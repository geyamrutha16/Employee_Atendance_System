const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const bcrypt = require('bcryptjs');
dotenv.config();

const seed = async () => {
    await connectDB(process.env.MONGO_URI);
    await User.deleteMany();
    await Attendance.deleteMany();

    const pass = await bcrypt.hash('password123', 10);

    const users = [
        { name: 'Alice Employee', email: 'alice@example.com', password: pass, role: 'employee', employeeId: 'EMP001', department: 'Engineering' },
        { name: 'Bob Employee', email: 'bob@example.com', password: pass, role: 'employee', employeeId: 'EMP002', department: 'Design' },
        { name: 'Mngr One', email: 'manager@example.com', password: pass, role: 'manager', employeeId: 'MGR001', department: 'Management' }
    ];
    const created = await User.insertMany(users);
    console.log('users created');

    // Sample attendance for last 7 days for Alice
    const alice = created.find(u => u.employeeId === 'EMP001');
    const records = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        records.push({
            userId: alice._id,
            date: dateStr,
            checkInTime: new Date(d.setHours(9, 0, 0)),
            checkOutTime: new Date(d.setHours(18, 0, 0)),
            status: 'present',
            totalHours: 9
        });
    }
    await Attendance.insertMany(records);
    console.log('attendance created');
    process.exit(0);
};

seed().catch(err => console.log(err));
