import React, { useState } from 'react';
import './JoinClass.css'; // Import your CSS file for styling

const JoinClass = ({ onClose }) => {
    const [classId, setClassCode] = useState('');

    const handleInputChange = (event) => {
        setClassCode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle submitting class code here, e.g., send it to server or parent component

        try{
            await fetch('http://localhost:3000/class/join', {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ classId, userId: localStorage.getItem('userId') }),
        });
        onClose(); // Close the popup after submitting
        } catch (error) {
            alert('Failed to join class');
        } finally {
            setClassCode(''); // Clear the input field
        }
    };

    return (
        <div className="join-class-popup">
            <div className="join-class-content">
                <span className="close-icon" onClick={onClose}>&times;</span>
                <h2>Join a Class</h2>
                <p>Ask your teacher for the class code, then enter it here.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={classId}
                        onChange={handleInputChange}
                        placeholder="Enter class code"
                        required
                    />
                    <button type="submit">Join</button>
                </form>
            </div>
        </div>
    );
};

export default JoinClass;
