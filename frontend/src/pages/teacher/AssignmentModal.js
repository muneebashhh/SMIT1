import React, { useState } from 'react';
import './JoinClass.css'; // Import your CSS file for styling

const AssignmentModal = ({ onClose, classId }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle submitting class code here, e.g., send it to server or parent component
        try{
            await fetch('http://localhost:3000/assignment/create', {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, classId: classId }),
        });
        onClose(); // Close the popup after submitting
        } catch (error) {
            alert('Failed to create assignment');
        } finally {
            setFormData({ title: '', description: '', dueDate: '' });
        }
    };

    return (
        <div className="join-class-popup">
            <div className="join-class-content">
                <span className="close-icon" onClick={onClose}>&times;</span>
                <h2>Create Assignment</h2>
                <p>Enter the assignment details below</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                        placeholder="Enter Assignment Title"
                        required
                    />
                     <textarea
                        value={formData.description}
                        onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                        placeholder="Description"
                        required
                    />
                    <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(event) => setFormData({ ...formData, dueDate: event.target.value })}
                        placeholder="Due Date"
                        required
                    />
                    <button type="submit">Assign</button>
                </form>
            </div>
        </div>
    );
};

export default AssignmentModal;
