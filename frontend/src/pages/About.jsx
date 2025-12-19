import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">About LearnHub</h1>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            LearnHub is a comprehensive e-learning platform designed to provide quality education
            to students worldwide. Our mission is to make learning accessible, engaging, and effective
            for everyone.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            We offer a wide range of courses across various subjects, taught by experienced instructors.
            Our platform features interactive learning materials, progress tracking, and personalized
            learning paths to help you achieve your educational goals.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Quality Content</h3>
              <p className="text-gray-600 dark:text-gray-400">Expert-curated courses with up-to-date information</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Flexible Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">Learn at your own pace, anytime, anywhere</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Progress Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">Monitor your learning journey with detailed analytics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;