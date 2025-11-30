const Attendance = require('../models/Attendance');
const User = require('../models/User');
const { createObjectCsvWriter } = require('csv-writer');

const formatDate = (d) => {
    const iso = new Date(d).toISOString();
    return iso.slice(0, 10); // YYYY-MM-DD
};

exports.checkIn = async (req, res) => {
    try {
        const user = req.user;
        const date = formatDate(new Date());
        const now = new Date();

        console.log('Check-in attempt for user:', user.email, 'on date:', date);
        let record = await Attendance.findOne({ userId: user._id, date });
        if (record && record.checkInTime) return res.status(400).json({ message: 'Already checked in' });

        if (!record) {
            record = new Attendance({ userId: user._id, date, checkInTime: now });
        } else {
            record.checkInTime = now;
        }

        // marking late if check-in after 09:30 (for example)
        const cutoff = new Date();
        cutoff.setHours(9, 30, 0, 0);
        record.status = (now > cutoff) ? 'late' : 'present';
        await record.save();
        res.json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.checkOut = async (req, res) => {
    try {
        const user = req.user;
        const date = formatDate(new Date());
        const now = new Date();

        const record = await Attendance.findOne({ userId: user._id, date });
        if (!record || !record.checkInTime) return res.status(400).json({ message: 'Check-in not found' });
        if (record.checkOutTime) return res.status(400).json({ message: 'Already checked out' });

        record.checkOutTime = now;
        const diffMs = Math.abs(record.checkOutTime - record.checkInTime);
        record.totalHours = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
        await record.save();
        res.json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.myHistory = async (req, res) => {
    try {
        const user = req.user;
        const records = await Attendance.find({ userId: user._id }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.mySummary = async (req, res) => {
    try {
        const user = req.user;
        const { month } = req.query; // 'YYYY-MM'
        const match = { userId: user._id };
        if (month) match.date = new RegExp(`^${month}`);
        const records = await Attendance.find(match);
        const summary = { present: 0, absent: 0, late: 0, halfDay: 0, totalHours: 0 };
        records.forEach(r => {
            if (r.status === 'present') summary.present++;
            if (r.status === 'absent') summary.absent++;
            if (r.status === 'late') summary.late++;
            if (r.status === 'half-day') summary.halfDay++;
            summary.totalHours += r.totalHours || 0;
        });
        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Manager endpoints
exports.allAttendance = async (req, res) => {
    try {
        const { employeeId, date, status } = req.query;
        const filter = {};
        if (employeeId) {
            const user = await User.findOne({ employeeId });
            if (user) filter.userId = user._id;
        }
        if (date) filter.date = date;
        if (status) filter.status = status;
        const records = await Attendance.find(filter).populate('userId', 'name employeeId department email').sort({ date: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.exportCSV = async (req, res) => {
    try {
        const records = await Attendance.find().populate('userId', 'name employeeId department email').lean();
        const csvWriter = createObjectCsvWriter({
            header: [
                { id: 'date', title: 'Date' },
                { id: 'employeeId', title: 'Employee ID' },
                { id: 'name', title: 'Name' },
                { id: 'department', title: 'Department' },
                { id: 'checkInTime', title: 'Check In' },
                { id: 'checkOutTime', title: 'Check Out' },
                { id: 'status', title: 'Status' },
                { id: 'totalHours', title: 'Total Hours' }
            ],
            path: 'attendance_export.csv'
        });
        const data = records.map(r => ({
            date: r.date,
            employeeId: r.userId?.employeeId || '',
            name: r.userId?.name || '',
            department: r.userId?.department || '',
            checkInTime: r.checkInTime ? new Date(r.checkInTime).toISOString() : '',
            checkOutTime: r.checkOutTime ? new Date(r.checkOutTime).toISOString() : '',
            status: r.status,
            totalHours: r.totalHours || 0
        }));
        await csvWriter.writeRecords(data);
        res.download('attendance_export.csv');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.calendarSummary = async (req, res) => {
    try {
        const { month } = req.query; // YYYY-MM
        if (!month) return res.json({});

        const regex = new RegExp(`^${month}`);
        const records = await Attendance.find({ date: regex });

        const summary = {};

        records.forEach((r) => {
            if (!summary[r.date]) {
                summary[r.date] = { present: 0, late: 0, absent: 0 };
            }

            if (r.status === "present") summary[r.date].present++;
            if (r.status === "late") summary[r.date].late++;
            if (r.status === "absent") summary[r.date].absent++;
        });

        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ message: "Date required" });

        const records = await Attendance.find({ date })
            .populate("userId", "name employeeId department");

        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAttendanceByDate = async (req, res) => {
    try {
        const date = req.params.date;

        const records = await Attendance.find({ date })
            .populate("userId", "name employeeId department");

        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
