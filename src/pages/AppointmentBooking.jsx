import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/AppointmentBooking.css';

const AppointmentBooking = () => {
    const { id } = useParams();
    const [doctorDetails, setDoctorDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({ name: '', date: '', time: '' });
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            alert('Please enter a comment.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ doctorId: id, comment }),
            });

            if (response.ok) {
                alert('Comment submitted successfully!');
                setComment('');
            } else {
                alert('Failed to submit comment.');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/api/appointments/confirmation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/appointmentConfirmation', {
                    state: { name: formData.name, date: formData.date, time: formData.time },
                });
            } else {
                alert('Failed to process appointment.');
            }
        } catch (error) {
            console.error('Error submitting appointment:', error);
        }
    };

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/doctors/appointment/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Doctor not found');
                    } else {
                        throw new Error('Failed to fetch doctor details');
                    }
                }
                const data = await response.json();
                setDoctorDetails(data);
            } catch (error) {
                console.error('Error fetching doctor details:', error);
                setErrorMessage(error.message);
            }
        };

        fetchDoctorDetails();
    }, [id]);

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (!doctorDetails) {
        return null;
    }

    return (
        <div className="appointment-booking-container">
            <div className="doctor-info">
                <h1 className="doctor-name">{doctorDetails.fullname}</h1>
                <p><strong>Specialization:</strong> {doctorDetails.area_of_interest}</p>
                <p><strong>Address:</strong> {doctorDetails.address}</p>
                <p><strong>Available Days:</strong> {doctorDetails.available_days?.join(', ')}</p>
                <p><strong>Available Hours:</strong> {doctorDetails.start_time} - {doctorDetails.end_time}</p>
                <p><strong>City:</strong> {doctorDetails.city}</p>
                <p><strong>Country:</strong> {doctorDetails.country}</p>
            </div>

            <div className="map-and-booking">
                <div className="google-map">
                    <iframe
                        title="Doctor Location"
                        width="100%"
                        height="400"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/place?key=""&q=${encodeURIComponent(
                            doctorDetails.address
                        )}`}
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="booking-form">
                    <h2>Book an Appointment</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Your Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Date:
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Time:
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <button type="submit">Book Appointment</button>
                    </form>

                    <h2>Leave a Comment</h2>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            rows="4"
                            placeholder="Write your comment here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button type="submit">Submit Comment</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBooking;
