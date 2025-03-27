import React, { useState } from 'react';
import './Gradepage.css';

function GradePage() {
    // const [studentGrades, setStudentGrades] = useState([
    //     { 
    //         studentId: 'CS2024001', 
    //         name: 'Alice Johnson',
    //         grades: [
    //             { courseName: 'Data Structures & Algorithms', date: '2024-01-15', grade: 'A' },
    //             { courseName: 'Operating Systems', date: '2024-02-20', grade: 'B+' },
    //             { courseName: 'Computer Networks', date: '2024-03-10', grade: 'A-' }
    //         ]
    //     },
    //     { 
    //         studentId: 'CS2024002', 
    //         name: 'Bob Smith',
    //         grades: [
    //             { courseName: 'Database Management Systems', date: '2024-01-25', grade: 'B' },
    //             { courseName: 'Artificial Intelligence', date: '2024-02-15', grade: 'A' },
    //             { courseName: 'Machine Learning', date: '2024-03-05', grade: 'A+' }
    //         ]
    //     },
    //     { 
    //         studentId: 'CS2024003', 
    //         name: 'Charlie Brown',
    //         grades: [
    //             { courseName: 'Cyber Security', date: '2024-01-20', grade: 'A-' },
    //             { courseName: 'Cloud Computing', date: '2024-02-25', grade: 'B+' }
    //         ]
    //     }
    // ]);

    const [studentGrades, setStudentGrades] = useState([])

    const [selectedStudent, setSelectedStudent] = useState(null);
    const token = localStorage.getData("token");

    const getData = async () => {
        const res = await axios.post("http://127.0.0.1:5000/grade", {
            token
        });
    }

    setSelectedStudent(getData()); // assume that we get the grades

    // const handleStudentSelect = (studentId) => {
    //     // give a get request to the server with that specific studentId
    //     const student = studentGrades.find(s => s.studentId === studentId);
    //     setSelectedStudent(student);
    // };

    const calculateGPA = (grades) => {
        const gradePoints = {
            'A+': 4.0, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'F': 0.0
        };

        const totalPoints = grades.reduce((sum, grade) => sum + gradePoints[grade.grade], 0);
        return (totalPoints / grades.length).toFixed(2);
    };

    return (
        <div className="grade-history-container flex justify-center items-center w-full h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Student Grade History</h2>
                
                <div className="student-selector mb-6">
                    <label className="block text-gray-700 text-lg mb-2">Select Student:</label>
                    <select 
                        onChange={(e) => handleStudentSelect(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                    >
                        <option value="">Select a Student</option>
                        {studentGrades.map(student => (
                            <option key={student.studentId} value={student.studentId}>
                                {student.name} ({student.studentId})
                            </option>
                        ))}
                    </select>
                </div>

                {selectedStudent && (
                    <div className="grade-details">
                        <div className="student-info bg-gray-100 p-4 rounded-lg mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">{selectedStudent.name}</h3>
                            <p className="text-gray-600">Student ID: {selectedStudent.studentId}</p>
                            <p className="text-gray-600">Cumulative GPA: {calculateGPA(selectedStudent.grades)}</p>
                        </div>

                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-100">
                                    <th className="border p-3 text-left">Course Name</th>
                                    <th className="border p-3 text-left">Examination Date</th>
                                    <th className="border p-3 text-left">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedStudent.grades.map((grade, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border p-3">{grade.courseName}</td>
                                        <td className="border p-3">{grade.date}</td>
                                        <td className="border p-3">
                                            <span className={`grade-badge ${
                                                ['A+', 'A', 'A-'].includes(grade.grade) 
                                                    ? 'bg-green-200 text-green-800' 
                                                    : ['B+', 'B', 'B-'].includes(grade.grade) 
                                                    ? 'bg-blue-200 text-blue-800' 
                                                    : 'bg-yellow-200 text-yellow-800'
                                            } px-2 py-1 rounded`}>
                                                {grade.grade}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GradePage;