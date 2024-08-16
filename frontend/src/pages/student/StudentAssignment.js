import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import JoinClass from './JoinClass'; // Import the JoinClass component

const UserHome = () => {
    const navigate = useNavigate(); // Define navigate using useNavigate hook
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isJoinClassOpen, setJoinClassOpen] = useState(false); // State for managing JoinClass popup
    const [myClasses, setMyClasses] = useState([]); // State for storing classes that the user is enrolled in
    const [selectedClass, setSelectedClass] = useState(null); // State for storing the selected class
    const [fileUrl, setFileUrl] = useState(""); // State for storing the file URL

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleJoinClassPopup = () => {
        setJoinClassOpen(!isJoinClassOpen);
    };

    const closeJoinClassPopup = () => {
        setJoinClassOpen(false);
    };

    const submitAssignment = async (assignmentId) => {
        // Submit an assignment
        try {
            const response = await fetch("http://localhost:5000/assignment/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    assignmentId,
                    fileUrl,
                    userId: localStorage.getItem("userId"),
                }),
            });
            const data = await response.json();
            if (data.message === "Submission uploaded successfully") {
                alert("Assignment submitted successfully");
            }
        } catch (error) {
            console.error("Error submitting assignment:", error);
            alert("Failed to submit assignment");
        }
    }

    const logout = () => {
        // Clear local storage and navigate to login page
        window.localStorage.clear();
        navigate("/login");
    };

    const navigateToChatComponent = () => {
        navigate('/ChatComponent'); // Navigate to '/ChatComponent' when clicked
    };

    return (
        <div className={`user-home ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <br />
            {selectedClass?.assignments.length > 0 ? (
                <div>
                    <h4>Assignments</h4>
                    <br />
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: 20, flexWrap: "wrap" }}>
                        {selectedClass?.assignments.map((assignment, index) => (
                            <li key={index} style={{ padding: 10, border: "1px solid #ccc", borderRadius: 5, marginBottom: 10, background: "#A759F5", width: "300px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }}>
                                <p style={{ color: "white" }}><strong>{assignment.title}</strong></p>
                                <p style={{ color: "white" }}>{assignment.description}</p>
                                <p style={{ color: "white" }}>Due Date: {new Date(assignment.dueDate).toDateString()}</p>
                                <input type="url" placeholder="Submission URL" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
                                <button style={{ background: "white", color: "#A759F5", border: "1px solid #A759F5", padding: 5, borderRadius: 5, width: "100%" }} onClick={() => submitAssignment(assignment._id)}>Submit</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No assignments</p>
            )}
            <br />
            {/* JoinClass popup */}
            {isJoinClassOpen && <JoinClass onClose={closeJoinClassPopup} />}
        </div>
    );
};

export default UserHome;
