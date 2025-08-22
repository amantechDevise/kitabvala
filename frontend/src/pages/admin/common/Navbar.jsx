// src/pages/admin/common/Navbar.jsx
import React, { useState } from 'react';
import avatarImg from '/smiling.avif'; 

const AdminNavbar = ({ userData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 px-4 py-3 fixed w-full z-20 top-0 left-0">
      <div className="max-w-screen-full mx-auto flex justify-between items-center">
        
        {/* Left side - Admin Dashboard */}
        <span className="text-xl font-semibold text-gray-900 dark:text-white">
          Admin Dashboard
        </span>

        {/* Right side - User avatar and dropdown */}
        {userData && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={avatarImg}
                alt="avatar"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <span className="text-gray-900 dark:text-white font-medium hidden sm:block">
                {userData.name}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-700 dark:border-gray-600">
                <div className="p-4 border-b border-gray-100 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{userData.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{userData.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      window.location.href = '/admin/tech/login';
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
