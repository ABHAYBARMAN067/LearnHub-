const calculateProgress = (completedLessons, totalLessons) => {
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons.length / totalLessons) * 100);
};

module.exports = calculateProgress;
