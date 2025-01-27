import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import DoctorRegistrationForm from './pages/DoctorRegistrationForm';
import ProtectedRoute from './components/ProtectedRoute';
import DoctorSearch from './pages/DoctorSearch';
import AppointmentBooking from './pages/AppointmentBooking';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import ViewAppointments from './pages/ViewAppointments';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminPanel />
                    </ProtectedRoute>
                }
            />
            <Route path="/register" element={<DoctorRegistrationForm />} />
            <Route path="/search" element={<DoctorSearch />} />
            <Route path="/appointment/:id" element={<AppointmentBooking />} />
            <Route path="/appointmentConfirmation" element={<AppointmentConfirmation />} />
            <Route path="/view-appointments" element={<ViewAppointments />} />
        </Routes>
    );
};

export default App;
