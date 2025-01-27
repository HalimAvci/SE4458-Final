const express = require('express');
const sendNotification = require('../services/publisher');

const router = express.Router();


router.get('/doctor/:id', async (req, res) => {
    const userId = req.query.userId;
    const doctorId = req.params.id;

    try {
        await sendNotification(userId, doctorId);
        res.status(200).json({ message: 'Doctor details fetched and notification queued.' });
    } catch (error) {
        console.error('Failed to queue notification:', error);
        res.status(500).json({ error: 'Failed to queue notification.' });
    }
});

module.exports = router;
