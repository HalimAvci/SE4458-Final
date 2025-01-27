import React, { useState } from 'react';
import '../styles/ViewAppointments.css';

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    // const [id, setDoctorId] = useState('');

    const handleViewAllAppointments = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/appointments');
            if (!response.ok) {
                throw new Error('Failed to fetch appointments.');
            }
            const data = await response.json();

            if (data.length === 0) {
                setErrorMessage('No appointments found.');
                setAppointments([]);
            } else {
                setErrorMessage('');
                setAppointments(data);
            }
            setIsVisible(true);
        } catch (error) {
            setErrorMessage('An error occurred while fetching appointments.');
            console.error(error);
        }
    };

    // const handleViewByDoctorId = async () => {
    //     if (!id.trim()) {
    //         setErrorMessage('Please enter a doctor ID.');
    //         return;
    //     }
    //
    //     try {
    //         const response = await fetch(`http://localhost:5001/api/appointments/doctor/${id}`, {
    //             method: 'GET',
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch appointments for this doctor.');
    //         }
    //         const data = await response.json();
    //
    //         if (data.length === 0) {
    //             setErrorMessage(`No appointments found for Doctor ID: ${id}`);
    //             setAppointments([]);
    //         } else {
    //             setErrorMessage('');
    //             setAppointments(data);
    //         }
    //         setIsVisible(true);
    //     } catch (error) {
    //         setErrorMessage('An error occurred while fetching appointments.');
    //         console.error(error);
    //     }
    // };

    const handleDeleteAppointment = async (appointmentId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5001/api/appointments/${appointmentId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the appointment.');
            }


            setAppointments((prevAppointments) =>
                prevAppointments.filter((appointment) => appointment.id !== appointmentId)
            );
            alert('Appointment deleted successfully!');
        } catch (error) {
            setErrorMessage('An error occurred while deleting the appointment.');
            console.error(error);
        }
    };

    const handleClose = () => {
        setAppointments([]);
        setErrorMessage('');
        setIsVisible(false);
    };

    return (
        <div className="view-appointments-container">
            <h1 className="view-title">Manage Appointments</h1>

            <div className="button-container">
                <button className="view-button" onClick={handleViewAllAppointments}>
                    View All Appointments
                </button>
                {/*<div className="doctor-id-container">*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        className="doctor-id-input"*/}
                {/*        placeholder="Enter Doctor ID"*/}
                {/*        value={id}*/}
                {/*        onChange={(e) => setDoctorId(e.target.value)}*/}
                {/*    />*/}
                {/*    <button className="view-button" onClick={handleViewByDoctorId}>*/}
                {/*        View by Doctor ID*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>

            {isVisible && (
                <div className="appointments-modal">
                    <div className="appointments-header">
                        <h2>Appointments:</h2>
                        <button className="close-button" onClick={handleClose}>
                            Close
                        </button>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {appointments.length > 0 && (
                        <ul className="appointments-list">
                            {appointments.map((appointment) => (
                                <li key={appointment.id} className="appointment-item">
                                    <p><strong>Name:</strong> {appointment.name}</p>
                                    <p><strong>Date:</strong> {appointment.date}</p>
                                    <p><strong>Time:</strong> {appointment.time}</p>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteAppointment(appointment.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewAppointments;