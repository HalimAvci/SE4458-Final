const amqp = require('amqplib/callback_api');


amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queue = 'appointment_notifications';
        const message = JSON.stringify({
            email: 'halim.avci20@gmail.com',
            doctorName: 'John Doe',
        });

        channel.assertQueue(queue, {
            durable: true,
        });

        channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Message sent to queue: ${message}`);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});
