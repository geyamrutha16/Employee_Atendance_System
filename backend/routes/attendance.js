const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middleware/auth');

router.post('/checkin', auth, attendanceController.checkIn);
router.post('/checkout', auth, attendanceController.checkOut);
router.get('/my-history', auth, attendanceController.myHistory);
router.get('/my-summary', auth, attendanceController.mySummary);

// Manager
router.get('/all', auth, attendanceController.allAttendance);
router.get('/export', auth, attendanceController.exportCSV);

module.exports = router;
