export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const USER_ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
};

export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

export const ENROLLMENT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  DROPPED: 'dropped',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN_DASHBOARD: '/admin/dashboard',
  CREATE_COURSE: '/admin/create-course',
  MANAGE_COURSES: '/admin/manage-courses',
  STUDENT_DASHBOARD: '/student/dashboard',
  ENROLLED_COURSES: '/student/enrolled-courses',
  COURSE_PROGRESS: '/student/course-progress',
};
