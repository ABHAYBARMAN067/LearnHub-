import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourse } from '../../hooks/useCourse';
import api from '../../api/authApi';

const StudentDashboard = () => {
  const { courses, fetchCourses } = useCourse();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchCourses();
        const enrollmentResponse = await api.get('/enrollments/user');
        setEnrollments(enrollmentResponse.data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchCourses]);

  const enrolledCourseIds = enrollments.map(enrollment => enrollment.course._id);
  const enrolledCourses = courses.filter(course => enrolledCourseIds.includes(course._id));
  const availableCourses = courses.filter(course => !enrolledCourseIds.includes(course._id) && course.status === 'published');

  const enrollInCourse = async (courseId) => {
    try {
      await api.post('/enrollments', { courseId });
      const enrollmentResponse = await api.get('/enrollments/user');
      setEnrollments(enrollmentResponse.data);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your learning progress and enrolled courses</p>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Enrolled Courses</h2>
          {enrolledCourses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{course.duration}</span>
                      <span className="text-sm text-gray-500">{course.totalLessons} lessons</span>
                    </div>
                    <Link
                      to={`/student/course/${course._id}`}
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-center text-sm font-medium hover:bg-indigo-700 transition-colors block"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
              <p className="text-sm text-gray-400">Browse available courses below and start learning!</p>
            </div>
          )}
        </div>

        {/* Available Courses */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Courses</h2>
          {availableCourses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{course.duration}</span>
                      <span className="text-sm text-gray-500">{course.totalLessons} lessons</span>
                    </div>
                    <button
                      onClick={() => enrollInCourse(course._id)}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-md text-center text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No courses available for enrollment at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;