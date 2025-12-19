const Progress = require('../models/Progress');
const Course = require('../models/Course');
const calculateProgress = require('../utils/calculateProgress');

// @desc    Get user progress for a course
// @route   GET /api/progress/:courseId
// @access  Private
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      student: req.user._id,
      course: req.params.courseId,
    });

    if (progress) {
      res.json(progress);
    } else {
      res.status(404).json({ message: 'Progress not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update progress for a course
// @route   PUT /api/progress/:courseId
// @access  Private
const updateProgress = async (req, res) => {
  const { completedLessons } = req.body;

  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let progress = await Progress.findOne({
      student: req.user._id,
      course: req.params.courseId,
    });

    if (progress) {
      progress.completedLessons = completedLessons;
      progress.progressPercentage = calculateProgress(completedLessons, course.lessons.length);
    } else {
      progress = new Progress({
        student: req.user._id,
        course: req.params.courseId,
        completedLessons,
        progressPercentage: calculateProgress(completedLessons, course.lessons.length),
      });
    }

    const updatedProgress = await progress.save();
    res.json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProgress,
  updateProgress,
};
