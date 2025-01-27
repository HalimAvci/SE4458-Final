const db = require('../db');


exports.addDoctor = (req, res) => {
    const { email, fullname, areaOfInterest, availableDays, startTime, endTime, address, city, country } = req.body;

    const query = `
        INSERT INTO doctors (email, fullname, area_of_interest, available_days, start_time, end_time, address, city, country, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `;

    const values = [
        email,
        fullname,
        areaOfInterest,
        JSON.stringify(availableDays),
        startTime,
        endTime,
        address,
        city,
        country,
    ];

    db.query(query, values, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to register doctor' });
        } else {
            res.status(201).json({ message: 'Doctor registered successfully' });
        }
    });
};


exports.getPendingDoctors = (req, res) => {
    const query = `SELECT * FROM doctors WHERE status = 'pending'`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch pending doctors' });
        } else {
            res.status(200).json(results);
        }
    });
};


exports.approveDoctor = (req, res) => {
    const { id } = req.params;

    const query = `UPDATE doctors SET status = 'approved' WHERE id = ?`;

    db.query(query, [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to approve doctor' });
        } else {
            res.status(200).json({ message: 'Doctor approved successfully' });
        }
    });
};

exports.searchDoctors = (req, res) => {
    const { query, country, city, autocomplete } = req.query;

    let sqlQuery = 'SELECT * FROM doctors WHERE status = "approved"';
    const params = [];

    if (query) {
        if (autocomplete === 'true') {
            sqlQuery = 'SELECT fullname, area_of_interest, country, city FROM doctors WHERE status = "approved" AND (fullname LIKE ? OR area_of_interest LIKE ?)';
            const searchQuery = `%${query}%`;
            params.push(searchQuery, searchQuery);
        } else {
            sqlQuery += ' AND (fullname LIKE ? OR area_of_interest LIKE ?)';
            const searchQuery = `%${query}%`;
            params.push(searchQuery, searchQuery);
        }
    }

    if (!autocomplete || autocomplete === 'false') {
        if (country) {
            sqlQuery += ' AND country = ?';
            params.push(country);
        }

        if (city) {
            sqlQuery += ' AND city = ?';
            params.push(city);
        }
    }
    db.query(sqlQuery, params, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to search doctors' });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getDoctorDetails = (req, res) => {
    const doctorId = req.params.id;

    const query = 'SELECT * FROM doctors WHERE id = ?';
    db.query(query, [doctorId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch doctor details' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(results[0]);
    });
};



