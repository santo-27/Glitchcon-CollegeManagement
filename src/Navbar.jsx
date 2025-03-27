import React, { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const userSpeech = event.results[0][0].transcript;
      handleAIResponse(userSpeech);
    };
  }, []);

  // Fetch AI Response from Flask Backend
  const handleAIResponse = async (query) => {
    const payload = { user_query: query };

    try {
      const res = await fetch("http://127.0.0.1:5000/api/voice-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResponse(data.reply);
      speak(data.reply);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("There was an issue processing your request.");
      speak("There was an issue processing your request.");
    }
  };

  // Convert AI response to speech
  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-gray-800">
              YourLogo
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a href="/home" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</a>
            <a href="/coursereg" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Course Registration</a>
            <a href="/attendance" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Attendance</a>
            <a href="/addFac" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Add Faculty</a>
            <a href="/examManage" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Manage Exam</a>
            <a href="/gradePage" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Grade Page</a>
            <a href="/manageUsers" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Manage Users</a>

            {/* Voice Assistant Button */}
            <button
              onClick={() => {
                if (isListening) {
                  recognitionRef.current.stop();
                } else {
                  recognitionRef.current.start();
                }
              }}
              className="p-2 bg-blue-500 text-white rounded-full transition-transform transform hover:scale-105"
              title="Voice Assistant"
            >
              🎙️
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
