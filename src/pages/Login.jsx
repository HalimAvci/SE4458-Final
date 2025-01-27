import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import edildi
import '../styles/Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Giriş kontrolü
        if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-section">
                <h1 className="login-title">Welcome Back, Admin!</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>} {/* Hata mesajı */}
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            <div className="login-info-section">
                <h2>Admin Portal</h2>
                <p>Manage doctor registrations and appointments securely from here.</p>
                <img
                    src="https://img.freepik.com/premium-vector/illustration-admin-panel-avatars-with-website_203633-1837.jpg?w=740"
                    alt="Admin Illustration"
                    className="login-illustration"
                />
            </div>
        </div>
    );
};

export default Login;
