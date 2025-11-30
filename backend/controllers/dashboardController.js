const User = require("../models/User");
const Attendance = require("../models/Attendance");

const today = () => new Date().toISOString().slice(0, 10);

// ----------- GET /api/dashboard/stats -----------
exports.getStats = async (req, res) => {
    try {
        const { month } = req.query; // YYYY-MM
        const dateToday = today();

        const totalEmployees = await User.countDocuments({ role: "employee" });

        const dateFilter = month
            ? { date: new RegExp(`^${month}`) }
            : { date: dateToday };

        const presentToday = await Attendance.countDocuments({
            ...dateFilter,
            status: "present"
        });

        const lateToday = await Attendance.countDocuments({
            ...dateFilter,
            status: "late"
        });

        const absentToday = totalEmployees - presentToday;

        res.json({
            totalEmployees,
            presentToday,
            absentToday,
            lateToday
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ----------- GET /api/dashboard/monthly-trend -----------
exports.getMonthlyTrend = async (req, res) => {
    try {
        const { month } = req.query;

        // fallback current month
        let monthRegex;
        if (month) monthRegex = new RegExp(`^${month}`);
        else {
            const now = new Date();
            const year = now.getFullYear();
            const m = String(now.getMonth() + 1).padStart(2, "0");
            monthRegex = new RegExp(`^${year}-${m}`);
        }

        const records = await Attendance.find({ date: monthRegex });

        const trend = {};

        records.forEach(r => {
            const day = r.date.slice(8, 10);
            if (!trend[day]) trend[day] = { present: 0, late: 0, absent: 0 };

            trend[day][r.status]++;
        });

        res.json(trend);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ----------- GET /api/dashboard/department-summary -----------
exports.getDepartmentSummary = async (req, res) => {
    try {
        const { month } = req.query;

        const users = await User.find({ role: "employee" });

        const summary = {};

        const monthFilter = month
            ? new RegExp(`^${month}`)
            : today(); // default today

        for (const user of users) {
            const dept = user.department || "General";

            if (!summary[dept])
                summary[dept] = { employees: 0, present: 0, late: 0 };

            summary[dept].employees++;

            const record = await Attendance.findOne({
                userId: user._id,
                date: month ? monthFilter : today()
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
