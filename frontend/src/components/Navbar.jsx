import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className={`bg-white dark:bg-gray-800 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              LearnHub
            </Link>
          </div>

          {/* Search bar - desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
<div className="hidden md:flex md:items-center md:space-x-4">
  <NavLink
    to="/"
    className={({ isActive }) =>
      isActive
        ? 'text-indigo-700 dark:text-indigo-400 font-semibold px-3 py-2 rounded-md'
        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md'
    }
  >
    Home
  </NavLink>

  <NavLink
    to="/about"
    className={({ isActive }) =>
      isActive
        ? 'text-indigo-700 dark:text-indigo-400 font-semibold px-3 py-2 rounded-md'
        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md'
    }
  >
    About
  </NavLink>

  <NavLink
    to="/contact"
    className={({ isActive }) =>
      isActive
        ? 'text-indigo-700 dark:text-indigo-400 font-semibold px-3 py-2 rounded-md'
        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md'
    }
  >
    Contact
  </NavLink>

  <NavLink
    to="/courses"
    className={({ isActive }) =>
      isActive
        ? 'text-indigo-700 dark:text-indigo-400 font-semibold px-3 py-2 rounded-md'
        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md'
    }
  >
    Courses
  </NavLink>
</div>

            {/* Notifications */}
            {user && (
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="relative px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  🔔
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 shadow-lg rounded-md z-50">
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Notifications</h3>
                      <div className="space-y-2">
                        <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded">
                          <p className="text-sm">Welcome to LearnHub! Start exploring courses.</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                        <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded">
                          <p className="text-sm">New course "React Basics" is now available.</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth Links */}
            {user ? (
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleMenu}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Dashboard ▼
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md z-50">
                    {user.role === 'admin' ? (
                    <NavLink
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Admin Dashboard
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/student/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        My Dashboard
                      </NavLink>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-indigo-700 dark:text-indigo-400 font-semibold px-3 py-2 rounded-md'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md'
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold'
                      : 'bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors'
                  }
                >
                  Register
                </NavLink>
              </>
            )}

            {/* Hamburger for mobile */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            {/* Mobile nav links */}
            <NavLink
              to="/"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Contact
            </NavLink>
            <NavLink
              to="/courses"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Courses
            </NavLink>

            {user ? (
              <>
                {user.role === 'admin' ? (
                  <NavLink
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Admin Dashboard
                  </NavLink>
                ) : (
                  <NavLink
                    to="/student/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    My Dashboard
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Register
                </NavLink>
              </>
            )}

            {/* Mobile search bar */}
            <form onSubmit={handleSearch} className="mt-2">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
