import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-gray-800">
              College Management System
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a 
              href="/home" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Home
            </a>
            <a 
              href="/coursereg" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Course Registration
            </a>
            <a 
              href="/attendance" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Attendance
            </a>
            <a 
              href="/addFac" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Add Faculty
            </a>
            <a 
              href="/examManage" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Manage Exam
            </a>
            <a 
              href="/gradePage" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              Grade Page
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;