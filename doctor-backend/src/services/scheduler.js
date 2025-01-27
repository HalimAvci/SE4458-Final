const cron = require('node-cron');
const processNotifications = require('./consumer');

cron.schedule('0 0 * * *', () => {
    console.log('Daily Notification Task Started');
    processNotifications();
});
