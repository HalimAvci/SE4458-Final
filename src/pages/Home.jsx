import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="admin-login">
                <button
                    className="admin-button"
                    onClick={() => navigate('/login')}
                >
                    Admin Login
                </button>
            </div>

            <h1 className="home-title">Welcome to Doctor Appointment System</h1>
            <p className="home-description">Choose an option below to get started:</p>

            <div className="home-buttons">
                <button
                    className="home-button button-blue"
                    onClick={() => navigate('/register')}
                >
                    Register as a Doctor
                </button>
                <button
                    className="home-button button-green"
                    onClick={() => navigate('/search')}
                >
                    Search for a Doctor
                </button>
                <button
                    className="home-button button-orange"
                    onClick={() => navigate('/view-appointments')}
                >
                    View Appointments
                </button>
            </div>
        </div>
    );
};

export default Home;
