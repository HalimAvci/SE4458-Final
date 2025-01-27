const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');


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
                        pass: 'fjse wuen jxyx cqed',
                    },
                });

                const mailOptions = {
                    from: 'halim.avci.se@gmail.com',
                    to: 'halim.avci20@gmail.com',
                    subject: 'Complete Your Appointment',
                    text: `You started booking an appointment but did not complete it.`,
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
