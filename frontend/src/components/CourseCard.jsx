import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCourse } from '../hooks/useCourse';

const CourseCard = ({ course }) => {
  const { user } = useAuth();
  const { deleteCourse } = useCourse();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await deleteCourse(course._id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
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

        <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            By {course.instructor?.name || 'Unknown Instructor'}
          </div>
          <div className="text-sm text-gray-500">
            {course.totalLessons} lessons
          </div>
        </div>

        {user && (
          <div className="mt-4">
            {user.role === 'admin' ? (
              <div className="flex space-x-2">
                <Link
                  to={`/admin/edit-course/${course._id}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-center text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            ) : (
              <Link
                to={`/student/course/${course._id}`}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-center text-sm font-medium hover:bg-indigo-700 transition-colors block"
              >
                View Course
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;