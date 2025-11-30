const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middleware/auth');
const managerOnly = require('../middleware/managerOnly');

router.post('/checkin', auth, attendanceController.checkIn);
router.post('/checkout', auth, attendanceController.checkOut);
router.get('/my-history', auth, attendanceController.myHistory);
router.get('/my-summary', auth, attendanceController.mySummary);

router.get('/all', auth, managerOnly, attendanceController.allAttendance);
router.get('/export', auth, managerOnly, attendanceController.exportCSV);

router.get('/calendar-summary', auth, managerOnly, attendanceController.calendarSummary);

router.get('/by-date/:date', auth, managerOnly, attendanceController.getAttendanceByDate);

module.exports = router;
