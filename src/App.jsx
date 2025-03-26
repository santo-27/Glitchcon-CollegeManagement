import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import CourseReg from './CourseReg';
import Home from './Home';
import Navbar from './Navbar';
import AddFac from './AddFac';
import AttendanceDashboard from './AttendaceDashboard';
import AttendancePage from './AttendancePage';

function App() {
  // const [count, setCount] = useState(0)
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/coursereg" element={<CourseReg />} />
        <Route path="/addFac" element={<AddFac />} />
        <Route path="/attendance" element={<AttendanceDashboard />} />
        <Route path="/attendance/:courseCode" element={<AttendancePage />} />
      </Routes>
    </div>
  )
}

export default App
