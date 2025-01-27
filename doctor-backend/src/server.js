require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
// const connectDB = require('../src/config/db');
const commentRoutes = require('../src/routes/comments');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// connectDB();



app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/comments', commentRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
