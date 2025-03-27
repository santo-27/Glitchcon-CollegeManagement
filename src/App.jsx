import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CourseReg from './CourseReg';
import Home from './Home';
import Navbar from './Navbar';
import AddFac from './AddFac';
import AttendanceDashboard from './AttendaceDashboard';
import AttendancePage from './AttendancePage';
import Login from './Login';
import ExamManagement from './ExamManagement';
import { AuthProvider } from "./AuthContext";
import GradePage from './GradePage';
import Admin from './Admin';

function App() {
  // const [count, setCount] = useState(0)
  const [role, setRole] = useState(localStorage.getItem("role") || null);


    const handleLogout = () => {

        localStorage.setItem("token", null);
        localStorage.setItem("role", null);
        setRole(null);
    };

  return (
    <Router>
    <div>
      <Navbar />
      {role ? (<Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        
        <Route path="/coursereg" element={<CourseReg />} />
        <Route path="/addFac" element={<AddFac />} />
        <Route path="/attendance" element={<AttendanceDashboard />} />
        <Route path="/attendance/:courseCode" element={<AttendancePage />} />
        <Route path="/examManage" element={<ExamManagement />} />
        <Route path="/gradePage" element={<GradePage />} />
        <Route path="/manageUsers" element={<Admin />} />
      </Routes>) : (<Login onLogin={setRole} />)}
    </div>
    </Router>

  )
}

export default App
