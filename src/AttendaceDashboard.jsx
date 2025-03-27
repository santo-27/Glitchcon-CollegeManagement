import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Comprehensive sample data
const SAMPLE_PROFESSOR_COURSES = [
  {
    course_code: 'CS101',
    course_name: 'Intro to Programming',
    slot: 'A',
    total_students: 45,
    department: 'Computer Science'
  },
  {
    course_code: 'CS202', 
    course_name: 'Data Structures',
    slot: 'B', 
    total_students: 35,
    department: 'Computer Science'
  },
  {
    course_code: 'CS301',
    course_name: 'Advanced Algorithms', 
    slot: 'C',
    total_students: 25,
    department: 'Computer Science'
  },
  {
    course_code: 'EE205',
    course_name: 'Digital Electronics',
    slot: 'D',
    total_students: 30,
    department: 'Electrical Engineering'
  }
];

function AttendanceDashboard() {
  // const [courses, setCourses] = useState(SAMPLE_PROFESSOR_COURSES);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Handle clicking on a course to view students
  const handleCourseClick = (courseCode) => {
    navigate(`/attendance/${courseCode}`);
  };

  const token = localStorage.getItem("token");

  const getData = async () => {
    const res = await axios.get("http://127.0.0.1:5000/attendance", {token});
    setCourses([res.data.attendance])
  }



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Professor Dashboard
          </h1>
          <div className="flex items-center space-x-3">
            <span className="text-gray-600">Welcome, Professor</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              P
            </div>
          </div>
        </div>

        {/* Departments Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Departments
          </h2>
          <div className="flex space-x-4">
            {['Computer Science', 'Electrical Engineering'].map((dept) => (
              <span 
                key={dept} 
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
              key={course.course_code}
              onClick={() => handleCourseClick(course.course_code)}
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {course.course_name}
                </h2>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {course.department}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <div className="space-x-2">
                  <span className="font-medium">Course Code:</span>
                  <span className="text-gray-800">{course.course_code}</span>
                </div>
                <div className="space-x-2">
                  <span className="font-medium">Slot:</span>
                  <span className="text-gray-800">{course.slot}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span>{course.total_students} Students</span>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-blue-500 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* No Courses Fallback */}
        {courses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-500 text-lg">
              No courses assigned at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendanceDashboard;