import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Sample student data (to be replaced with actual API call)
const SAMPLE_STUDENTS = [
  {
    student_id: '1001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    present: false
  },
  {
    student_id: '1002', 
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    present: false
  },
  {
    student_id: '1003',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com', 
    present: false
  }
];

function AttendancePage() {
  const [students, setStudents] = useState(SAMPLE_STUDENTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { courseCode } = useParams();

  useEffect(() => {
    // Fetch students for the specific course
    const fetchStudents = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`/api/course/${courseCode}/students`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // You might want to use actual data from the response instead of sample data
        // setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch students');
        setLoading(false);
        console.error(err);
      }
    };

    fetchStudents();
  }, [courseCode]);

  // Toggle attendance for a student
  const toggleAttendance = (studentId) => {
    setStudents(students.map(student => 
      student.student_id === studentId 
        ? { ...student, present: !student.present }
        : student
    ));
  };

  // Submit attendance
  const submitAttendance = async () => {
    try {
      await axios.post(`/api/course/${courseCode}/attendance`, {
        students: students.map(student => ({
          student_id: student.student_id,
          present: student.present
        }))
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Attendance submitted successfully!');
    } catch (err) {
      alert('Failed to submit attendance');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Attendance for Course: {courseCode}
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Student ID</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-center">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr 
                  key={student.student_id} 
                  className="hover:bg-gray-50"
                >
                  <td className="border p-3">{student.student_id}</td>
                  <td className="border p-3">{student.name}</td>
                  <td className="border p-3">{student.email}</td>
                  <td className="border p-3 text-center">
                    <input 
                      type="checkbox"
                      checked={student.present}
                      onChange={() => toggleAttendance(student.student_id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-end">
            <button
              onClick={submitAttendance}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;