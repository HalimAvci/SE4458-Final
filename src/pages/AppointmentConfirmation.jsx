import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/AppointmentConfirmation.css';

const AppointmentConfirmation = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return <p>No appointment data available.</p>;
    }

    const { name, date, time } = state;


    const handleConfirm = async() => {
        try {
            const response = await fetch('http://localhost:5001/api/appointments/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, date, time }),
            });

            if (response.ok) {
                alert('Appointment confirmed and saved!');
                navigate('/');
            } else {
                alert('Failed to save appointment.');
            }
        } catch (error) {
            console.error('Error saving appointment:', error);
            alert('An error occurred.');
        }
    };

    return (
        <div className="appointment-confirmation-container">
            <h1 className="confirmation-title">Appointment Confirmation</h1>

            <div className="appointment-details">
                <p><span className="label">Your Name:</span> <span className="value">{name}</span></p>
                <p><span className="label">Appointment Date:</span> <span className="value">{date}</span></p>
                <p><span className="label">Appointment Time:</span> <span className="value">{time}</span></p>
            </div>

            <div className="confirmation-buttons">
                <button onClick={handleConfirm} className="confirm-button">Confirm Appointment</button>
                <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
            </div>
        </div>
    );
};

export default AppointmentConfirmation;
