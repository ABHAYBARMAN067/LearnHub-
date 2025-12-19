import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCourse } from '../hooks/useCourse';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const { courses, fetchCourses, loading } = useCourse();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    const term = searchParams.get('search') || '';
    setSearchTerm(term);
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course =>
      course.status === 'published' &&
      (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [courses, searchTerm]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      setSearchParams({ search: term });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">All Courses</h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Discover our comprehensive collection of courses
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading courses...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No courses found matching your search.' : 'No courses available at the moment.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;