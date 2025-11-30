const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const dashboard = require("../controllers/dashboardController");

// MAKE SURE THESE FUNCTIONS EXIST in controller
router.get("/stats", auth, dashboard.getStats);
router.get("/monthly-trend", auth, dashboard.getMonthlyTrend);
router.get("/department-summary", auth, dashboard.getDepartmentSummary);

module.exports = router;
