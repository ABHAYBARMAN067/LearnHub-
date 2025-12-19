import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../../hooks/useCourse';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    status: 'draft',
  });
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState('');
  const { createCourse } = useCourse();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addLesson = () => {
    setLessons([...lessons, { title: '', content: '', duration: '', order: lessons.length + 1 }]);
  };

  const updateLesson = (index, field, value) => {
    const updatedLessons = lessons.map((lesson, i) =>
      i === index ? { ...lesson, [field]: value } : lesson
    );
    setLessons(updatedLessons);
  };

  const removeLesson = (index) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.duration) {
      setError('Please fill in all required fields');
      return;
    }

    const courseData = {
      ...formData,
      lessons,
      totalLessons: lessons.length,
    };

    const result = await createCourse(courseData);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="mt-2 text-gray-600">Add course details and lessons</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Course Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Duration *
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  placeholder="e.g., 4 weeks"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lessons Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Lessons</h3>
              <button
                type="button"
                onClick={addLesson}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Add Lesson
              </button>
            </div>

            {lessons.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No lessons added yet. Click "Add Lesson" to get started.</p>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-medium">Lesson {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeLesson(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Title
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={lesson.title}
                          onChange={(e) => updateLesson(index, 'title', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Duration
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 30 min"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={lesson.duration}
                          onChange={(e) => updateLesson(index, 'duration', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Content
                      </label>
                      <textarea
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={lesson.content}
                        onChange={(e) => updateLesson(index, 'content', e.target.value)}
                        placeholder="Lesson content or description..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="bg-gray-600 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;