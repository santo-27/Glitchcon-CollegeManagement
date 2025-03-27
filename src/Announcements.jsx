// import { useState, useEffect } from "react";
// import axios from "axios";

// const Announcements = ({ role }) => {
//     const [announcements, setAnnouncements] = useState([]);
//     const [newAnnouncement, setNewAnnouncement] = useState("");
//     const [showNotification, setShowNotification] = useState(false);

//     useEffect(() => {
//         fetchAnnouncements();
//     }, []);

//     const fetchAnnouncements = async () => {
//         try {
//             const response = await axios.get("/api/announcements");
//             setAnnouncements(response.data);
//         } catch (error) {
//             console.error("Error fetching announcements:", error);
//         }
//     };

//     const handleAddAnnouncement = async () => {
//         if (!newAnnouncement.trim()) return;
//         try {
//             await axios.post("/api/announcements", { text: newAnnouncement });
//             fetchAnnouncements();
//             setNewAnnouncement("");
//         } catch (error) {
//             console.error("Error adding announcement:", error);
//         }
//     };

//     return (
//         <div className="bg-white p-4 shadow-md rounded-md">
//             <h2 className="text-xl font-bold mb-2">Announcements</h2>
//             {role === "admin" && (
//                 <div className="mb-4">
//                     <textarea
//                         className="w-full p-2 border rounded"
//                         placeholder="Enter new announcement..."
//                         value={newAnnouncement}
//                         onChange={(e) => setNewAnnouncement(e.target.value)}
//                     ></textarea>
//                     <button
//                         className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
//                         onClick={handleAddAnnouncement}
//                     >
//                         Add Announcement
//                     </button>
//                 </div>
//             )}
//             {showNotification && role !== "admin" && (
//                 <div className="bg-yellow-200 p-2 rounded-md mb-2">New announcement added!</div>
//             )}
//             <ul>
//                 {announcements.map((announcement, index) => (
//                     <li key={index} className="border-b py-2">{announcement.text}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Announcements;
import React from "react";

const Announcements = () => {
  const announcements = [
    { id: 1, title: "New Semester Begins!", description: "Classes will commence from April 10th. Be prepared!" },
    { id: 2, title: "Library Renovation", description: "The college library will be under renovation from May 1st to May 15th." },
    { id: 3, title: "Hackathon Registration", description: "Sign up for the upcoming coding hackathon before March 30th." },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Announcements</h2>
      <ul className="space-y-3">
        {announcements.map((announcement) => (
          <li key={announcement.id} className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">{announcement.title}</h3>
            <p className="text-gray-600">{announcement.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;

