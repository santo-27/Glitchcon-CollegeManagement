import React, { useState, useEffect } from 'react';
import CreateExamModal from './CreateExamModal'; // Import Modal Component

const ExamManagement = () => {
    const [isTeacher, setIsTeacher] = useState(true); // Placeholder for user role
    const [exams, setExams] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    // Simulated API call to fetch exams
    useEffect(() => {
        const fetchExams = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));

            const dummyExams = [
                { date: "2024-07-15", time: "10:00 AM", questions: ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?"] },
                { date: "2024-07-20", time: "2:00 PM", questions: ["Q1?", "Q2?", "Q3?", "Q4?", "Q5?"] }
            ];
            
            setExams(dummyExams);
        };

        fetchExams();
    }, []);

    // Handle exam creation
    const handleCreateExam = (newExam) => {
        setExams(prevExams => [...prevExams, newExam]);
        setModalOpen(false);
    };

    // when backend is ready
    // const fetchExams = async () => {
    //     const response = await fetch('https://your-api.com/exams');
    //     const data = await response.json();
    //     setExams(data);
    // };
    

    if (!isTeacher) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-red-600 text-lg font-semibold">
                    You do not have permission to manage exams.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-6"> Exam Management</h1>

            <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition"
                onClick={() => setModalOpen(true)}
            >
                Create New Exam
            </button>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                {exams.map((exam, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Exam on {exam.date} at {exam.time}
                        </h2>
                        <h3 className="mt-2 font-medium text-gray-600">Questions:</h3>
                        <ul className="mt-2 text-gray-600 text-sm">
                            {exam.questions.map((question, qIndex) => (
                                <li key={qIndex} className="border-b py-1">{question}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <CreateExamModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onCreate={handleCreateExam} 
            />
        </div>
    );
};

export default ExamManagement;
