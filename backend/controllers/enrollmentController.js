const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private/Student
const enrollInCourse = async (req, res) => {
  const { courseId } = req.body;

  try {
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollment = new Enrollment({
      student: req.user._id,
      course: courseId,
    });

    const createdEnrollment = await enrollment.save();
    res.status(201).json(createdEnrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's enrollments
// @route   GET /api/enrollments
// @access  Private
const getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate('course');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get enrollments for a course (Admin)
// @route   GET /api/enrollments/course/:courseId
// @access  Private/Admin
const getCourseEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.courseId }).populate('student', 'name email');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enrollInCourse,
  getUserEnrollments,
  getCourseEnrollments,
};
