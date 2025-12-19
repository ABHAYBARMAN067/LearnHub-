const express = require('express');
const {
  enrollInCourse,
  getUserEnrollments,
  getCourseEnrollments,
} = require('../controllers/enrollmentController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// All enrollment routes require authentication
router.use(protect);

// Student routes
router.post('/', enrollInCourse);
router.get('/user', getUserEnrollments);

// Admin routes
router.get('/course/:courseId', admin, getCourseEnrollments);

module.exports = router;
