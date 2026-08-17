const nodemailer = require('nodemailer')

transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },

    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 60000,

    pool: true,
    maxConnections: 5,
    maxMessages: 100
});

module.exports = transporter