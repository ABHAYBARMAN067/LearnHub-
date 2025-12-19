import React, { createContext, useState, useCallback } from 'react';
import api from '../api/authApi';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourse = useCallback(async (courseData) => {
    try {
      const response = await api.post('/courses', courseData);
      setCourses(prevCourses => [...prevCourses, response.data]);
      return { success: true, course: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to create course' };
    }
  }, []);

  const updateCourse = useCallback(async (id, courseData) => {
    try {
      const response = await api.put(`/courses/${id}`, courseData);
      setCourses(prevCourses => prevCourses.map(course => course._id === id ? response.data : course));
      return { success: true, course: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update course' };
    }
  }, []);

  const deleteCourse = useCallback(async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to delete course' };
    }
  }, []);

  const value = {
    courses,
    loading,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};