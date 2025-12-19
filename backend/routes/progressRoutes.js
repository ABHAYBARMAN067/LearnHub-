const express = require('express');
const { getProgress, updateProgress } = require('../controllers/progressController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// All progress routes require authentication
router.use(protect);

router.get('/:courseId', getProgress);
router.put('/:courseId', updateProgress);

module.exports = router;
router.use(protect);

router.get('/:courseId', getProgress);
router.put('/:courseId', updateProgress);

module.exports = router;
