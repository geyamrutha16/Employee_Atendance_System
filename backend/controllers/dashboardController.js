const User = require("../models/User");
const Attendance = require("../models/Attendance");

const today = () => new Date().toISOString().slice(0, 10);

// ----------- GET /api/dashboard/stats -----------
exports.getStats = async (req, res) => {
    try {
        const dateToday = today();

        const totalEmployees = await User.countDocuments({ role: "employee" });
        const presentToday = await Attendance.countDocuments({ date: dateToday });
        const lateToday = await Attendance.countDocuments({
            date: dateToday,
            status: "late",
        });

        const absentToday = totalEmployees - presentToday;

        res.json({
            totalEmployees,
            presentToday,
            absentToday,
            lateToday,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ----------- GET /api/dashboard/monthly-trend -----------
exports.getMonthlyTrend = async (req, res) => {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");

        const regex = new RegExp(`^${year}-${month}`);
        const records = await Attendance.find({ date: regex });

        const trend = {};

        records.forEach((r) => {
            const day = r.date.slice(8, 10);
            if (!trend[day])
                trend[day] = { present: 0, late: 0, absent: 0 };

            if (r.status === "present") trend[day].present++;
            else if (r.status === "late") trend[day].late++;
            else if (r.status === "absent") trend[day].absent++;
        });

        res.json(trend);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ----------- GET /api/dashboard/department-summary -----------
exports.getDepartmentSummary = async (req, res) => {
    try {
        const users = await User.find({ role: "employee" });

        const summary = {};

        for (const user of users) {
            const dept = user.department || "General";

            if (!summary[dept])
                summary[dept] = { employees: 0, present: 0, late: 0 };

            summary[dept].employees++;

            const record = await Attendance.findOne({
                userId: user._id,
                date: today(),
            });

            if (record) {
                if (record.status === "present") summary[dept].present++;
                if (record.status === "late") summary[dept].late++;
            }
        }

        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
