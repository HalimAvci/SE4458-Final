const express = require('express');
const { addDoctor, getPendingDoctors, approveDoctor, searchDoctors, getDoctorDetails } = require('../controllers/doctorController');
const router = express.Router();


router.post('/register', addDoctor);


router.get('/pending', getPendingDoctors);

router.put('/approve/:id', approveDoctor);

// app.route('/approve/:id').put(approveDoctor);

router.get('/search', searchDoctors);

router.get('/autocomplete', searchDoctors);

router.get('/appointment/:id', getDoctorDetails);

module.exports = router;