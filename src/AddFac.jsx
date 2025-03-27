import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Sample previous registrations data
const SAMPLE_PREVIOUS_DATA = [
  {
    id: 1,
    faculty: 'Computer Science',
    courseCode: 'CS101',
    slot: 'A',
    date: '2024-03-20T10:30:00Z'
  },
  {
    id: 2,
    faculty: 'Electrical Engineering',
    courseCode: 'EE202',
    slot: 'B',
    date: '2024-03-21T14:45:00Z'
  },
  {
    id: 3,
    faculty: 'Mechanical Engineering',
    courseCode: 'ME101',
    slot: 'C',
    date: '2024-03-22T09:15:00Z'
  },
  {
    id: 4,
    faculty: 'Computer Science',
    courseCode: 'CS202',
    slot: 'D',
    date: '2024-03-23T11:20:00Z'
  }
];

// Sample data for dropdowns
const facultyDataa = [
  { id: 1, name: 'Computer Science' },
  { id: 2, name: 'Electrical Engineering' },
  { id: 3, name: 'Mechanical Engineering' }
];

const courseData = {
  'Computer Science': [
    { code: 'CS101', name: 'Intro to Programming' },
    { code: 'CS202', name: 'Data Structures' }
  ],
  'Electrical Engineering': [
    { code: 'EE101', name: 'Circuit Theory' },
    { code: 'EE202', name: 'Signal Processing' }
  ],
  'Mechanical Engineering': [
    { code: 'ME101', name: 'Thermodynamics' },
    { code: 'ME202', name: 'Machine Design' }
  ]
};

const slots = ['A', 'B', 'C', 'D', 'E'];

function AddFac() {
  const [previousData, setPreviousData] = useState(SAMPLE_PREVIOUS_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [facultyData, setFacultyData] = useState(facultyDataa)
  // Form state
  const [faculty, setFaculty] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState('');
  const [slot, setSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update courses when faculty changes
  const handleFacultyChange = (e) => {
    const selectedFaculty = e.target.value;
    setFaculty(selectedFaculty);
    setCourses(courseData[selectedFaculty] || []);
    setCourseCode(''); // Reset course code
  };

  const getData = async () => {
    const res = await axios.get("http://127.0.0.1:6001/get/faculty");
    console.log(res);
    setPreviousData(res.data.assigned);
    setFacultyData(res.data.available);
  }
  getData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulated submission
      const newRegistration = {
        id: previousData.length + 1,
        faculty,
        courseCode,
        slot,
        date: new Date().toISOString()
      };

      // Add new registration to the top of the list
      setPreviousData([newRegistration, ...previousData]);

      // Reset form
      alert('Course registration successful!');
      setFaculty('');
      setCourseCode('');
      setSlot('');
    } catch (err) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Previous Data Section - Upper Half */}
      <div className="w-full bg-white shadow-md p-6 h-[50vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Previous Registrations
        </h2>
        
        {previousData.length === 0 ? (
          <div className="text-center text-gray-500">No previous registrations</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Faculty</th>
                <th className="border p-2">Course Code</th>
                <th className="border p-2">Slot</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {previousData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border p-2 text-center">{item.faculty}</td>
                  <td className="border p-2 text-center">{item.courseCode}</td>
                  <td className="border p-2 text-center">{item.slot}</td>
                  <td className="border p-2 text-center">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Form Section - Lower Half */}
      <div className="w-full flex items-center justify-center bg-gray-100 h-[50vh] px-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Course Registration
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Faculty Dropdown */}
            <div>
              <label 
                htmlFor="faculty" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Faculty Name
              </label>
              <select
                id="faculty"
                value={faculty}
                onChange={handleFacultyChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Faculty</option>
                {facultyData.map((fac) => (
                  <option key={fac.id} value={fac.fullname}>
                    {fac.fullname}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Code Dropdown */}
            <div>
              <label 
                htmlFor="courseCode" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Course Code
              </label>
              <select
                id="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                required
                disabled={!faculty}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.code} value={course.code}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Slot Dropdown */}
            <div>
              <label 
                htmlFor="slot" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Slot
              </label>
              <select
                id="slot"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Slot</option>
                {slots.map((slotOption) => (
                  <option key={slotOption} value={slotOption}>
                    {slotOption}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFac;