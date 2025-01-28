const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
const db = require('../db');

exports.queueAppointment = (req, res) => {
    const { name, date, time } = req.body;

    if (!name || !date || !time ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const message = { name, date, time };

    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            console.error('RabbitMQ connection error:', error0);
            return res.status(500).json({ error: 'Failed to connect to message queue' });
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                console.error('RabbitMQ channel error:', error1);
                return res.status(500).json({ error: 'Failed to create channel' });
            }

            const queue = 'appointment_notifications';

            channel.assertQueue(queue, { durable: true });

            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
                persistent: true,
            });

            console.log('Message queued:', message);
            res.status(200).json({ message: 'Appointment queued successfully' });
        });
    });
};

exports.messageAppointment = (req, res) => {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            const queue = 'appointment_notifications';

            channel.assertQueue(queue, {
                durable: true,
            });

            console.log(`Waiting for messages in queue: ${queue}`);

            channel.consume(queue, async (msg) => {
                if (msg !== null) {
                    const { name, email, date, time } = JSON.parse(msg.content.toString());

                    console.log(`Received message: ${msg.content.toString()}`);

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'halim.avci.se@gmail.com',
                            pass: '***',
                        },
                    });

                    const mailOptions = {
                        from: 'halim.avci.se@gmail.com',
                        to: 'halim.avci20@gmail.com',
                        subject: 'Complete Your Appointment',
                        text: `You started booking an appointment with but did not complete it.`,
                    };

                    try {
                        await transporter.sendMail(mailOptions);
                        console.log(`Email sent to halim.avci20@gmail.com`);
                        channel.ack(msg);
                    } catch (error) {
                        console.error('Failed to send email:', error);
                        channel.nack(msg);
                    }
                }
            });
        });
    });
};

exports.saveAppointment = (req, res) => {
    const { name, date, time } = req.body;

    if (!name || !date || !time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO doctor_appointment (name, date, time) VALUES (?, ?, ?)';
    db.query(query, [name, date, time], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to save appointment' });
        }
        res.status(201).json({ message: 'Appointment saved successfully' });
    });
};

exports.getAppointments = (req, res) => {
    const query = 'SELECT * FROM doctor_appointment';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch appointments' });
        }
        res.status(200).json(results);
    });
};

// exports.getAppointmentById = (req, res) => {
//     const { id } = req.params;
//
//     const query = 'SELECT * FROM doctors WHERE id = ?';
//     db.query(query, [id], (err, result) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ error: 'Failed to fetch appointment' });
//         }
//         if (result.length === 0) {
//             return res.status(404).json({ error: 'Appointment not found' });
//         }
//         res.status(200).json(result[0]);
//     });
// };

exports.deleteAppointment = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM doctor_appointment WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to delete appointment' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    });
};




