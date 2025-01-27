import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Doctor Appointment System</h1>
                <div className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                    <Link to="/search" className="hover:underline">Search</Link>
                    <Link to="/admin" className="hover:underline">Admin Panel</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
