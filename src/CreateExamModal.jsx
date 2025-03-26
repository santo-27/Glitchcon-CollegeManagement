import React, { useState } from 'react';

const CreateExamModal = ({ isOpen, onClose, onCreate }) => {
    const [examDate, setExamDate] = useState('');
    const [examTime, setExamTime] = useState('');
    const [questions, setQuestions] = useState(Array(10).fill(''));

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);
    };

    // when exam creation backend is ready
    // const handleCreateExam = async (newExam) => {
    //     const response = await fetch('https://your-api.com/exams', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(newExam),
    //     });
    
    //     if (response.ok) {
    //         const savedExam = await response.json();
    //         setExams(prevExams => [...prevExams, savedExam]);
    //     }
    // };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ date: examDate, time: examTime, questions });
        setExamDate('');
        setExamTime('');
        setQuestions(Array(10).fill(''));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800">📝 Create New Exam</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <label className="block font-medium">Date:</label>
                    <input 
                        type="date" 
                        value={examDate} 
                        onChange={(e) => setExamDate(e.target.value)} 
                        className="border p-2 w-full rounded-md mt-1 focus:ring focus:ring-blue-300"
                        required 
                    />

                    <label className="block font-medium mt-4">Time:</label>
                    <input 
                        type="time" 
                        value={examTime} 
                        onChange={(e) => setExamTime(e.target.value)} 
                        className="border p-2 w-full rounded-md mt-1 focus:ring focus:ring-blue-300"
                        required 
                    />

                    <h3 className="mt-4 font-medium text-gray-700">Questions:</h3>
                    {questions.map((question, index) => (
                        <input 
                            key={index} 
                            type="text" 
                            value={question} 
                            onChange={(e) => handleQuestionChange(index, e.target.value)} 
                            placeholder={`Question ${index + 1}`} 
                            className="border p-2 w-full rounded-md mt-1 focus:ring focus:ring-blue-300"
                        />
                    ))}

                    <div className="flex justify-between mt-6">
                        <button 
                            type="button" 
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            Create Exam
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateExamModal;
