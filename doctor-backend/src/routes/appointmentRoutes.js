const express = require('express');
const { queueAppointment, saveAppointment, getAppointments, getAppointmentById, deleteAppointment } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/confirmation', queueAppointment);

router.post('/save', saveAppointment);

router.get('/', getAppointments);

// router.get('/doctor/:id', getAppointmentById);

router.delete('/:id', deleteAppointment);

module.exports = router;
