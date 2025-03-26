import React, { useState } from "react";
import "./CourseReg.css"; // Local styles

function CourseReg() {
    const courses = [
        { id: 1, name: "Data Structures & Algorithms" },
        { id: 2, name: "Operating Systems" },
        { id: 3, name: "Computer Networks" },
        { id: 4, name: "Database Management Systems" },
        { id: 5, name: "Artificial Intelligence" },
        { id: 6, name: "Machine Learning" },
        { id: 7, name: "Cyber Security" },
        { id: 8, name: "Cloud Computing" },
    ];

    const [selectedCourse, setSelectedCourse] = useState(""); // Only one course can be selected
    const [submitted, setSubmitted] = useState(false);

    const handleCheckboxChange = (courseName) => {
        setSelectedCourse(courseName); // Only one selection allowed
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedCourse) {
            setSubmitted(true);
        } else {
            alert("Please select a course before submitting!");
        }
    };

    return (
        <div className="course-container flex justify-center items-center w-full h-screen bg-gray-200">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Course Registration</h2>
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="course-form">
                        <div className="course-list flex flex-col gap-4">
                            {courses.map((course) => (
                                <label key={course.id} className="course-item flex items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                                    <input
                                        type="radio"
                                        name="course"
                                        value={course.name}
                                        onChange={() => handleCheckboxChange(course.name)}
                                        checked={selectedCourse === course.name}
                                        className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-400"
                                    />
                                    <span className="text-lg text-gray-700 ml-3">{course.name}</span>
                                </label>
                            ))}
                        </div>
                        <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                            Register
                        </button>
                    </form>
                ) : (
                    <div className="success-message text-center">
                        <h3 className="text-green-600 text-xl font-semibold">✅ Successfully registered for:</h3>
                        <p className="mt-3 text-gray-700 text-lg">{selectedCourse}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseReg;
