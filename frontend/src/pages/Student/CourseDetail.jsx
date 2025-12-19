import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/authApi';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadCourseData = async () => {
      try {
        // Load course details
        const courseResponse = await api.get(`/courses/${courseId}`);
        setCourse(courseResponse.data);

        // Check if user is enrolled
        const enrollmentsResponse = await api.get('/enrollments/user');
        const userEnrollment = enrollmentsResponse.data.find(
          (enrollment) => enrollment.course._id === courseId
        );
        setEnrollment(userEnrollment);

        // If enrolled, load progress
        if (userEnrollment) {
          try {
            const progressResponse = await api.get(`/progress/${courseId}`);
            setProgress(progressResponse.data);
          } catch {
            // Progress might not exist yet, that's okay
            setProgress(null);
          }
        }
      } catch (error) {
        console.error('Error loading course data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [courseId, user, navigate]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await api.post('/enrollments', { courseId });
      // Reload the page data
      window.location.reload();
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Failed to enroll in course. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleLessonComplete = async (lessonId) => {
    if (!enrollment) return;

    try {
      const currentCompletedLessons = progress?.completedLessons || [];
      const updatedCompletedLessons = currentCompletedLessons.includes(lessonId)
        ? currentCompletedLessons.filter(id => id !== lessonId)
        : [...currentCompletedLessons, lessonId];

      const response = await api.put(`/progress/${courseId}`, {
        completedLessons: updatedCompletedLessons,
      });

      setProgress(response.data);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-500">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Course not found.</p>
        </div>
      </div>
    );
  }

  const completedLessons = progress?.completedLessons || [];
  const progressPercentage = progress?.progressPercentage || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              course.status === 'published'
                ? 'bg-green-100 text-green-800'
                : course.status === 'draft'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {course.status}
            </span>
            <span className="text-sm text-gray-500">{course.duration}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              By {course.instructor?.name || 'Unknown Instructor'}
            </div>
            <div className="text-sm text-gray-500">
              {course.totalLessons} lessons
            </div>
          </div>

          {/* Enrollment/Progress Section */}
          <div className="mt-6">
            {enrollment ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500">{progressPercentage}% complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {completedLessons.length} of {course.lessons?.length || 0} lessons completed
                </p>
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrolling || course.status !== 'published'}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enrolling ? 'Enrolling...' : course.status === 'published' ? 'Enroll Now' : 'Course Not Available'}
              </button>
            )}
          </div>
        </div>

        {/* Lessons */}
        {enrollment && course.lessons && course.lessons.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => {
                const lessonId = `lesson-${courseId}-${index}`;
                const isCompleted = completedLessons.includes(lessonId);
                return (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${
                      isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {isCompleted ? (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-xs text-gray-600 font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{lesson.title}</h3>
                          <p className="text-sm text-gray-600">{lesson.duration}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleLessonComplete(lessonId)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          isCompleted
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                      </button>
                    </div>
                    {lesson.content && (
                      <div className="mt-3 pl-9">
                        <p className="text-gray-700">{lesson.content}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!enrollment && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">Enroll in this course to access the content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;