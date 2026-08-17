const nodemailer = require('nodemailer')
const transporter = require('./mailTransporter')

const mailSender = async (email, title, body) => {
    try {
        console.time("send-email");
        return await transporter.sendMail({
            from: `MyNotes App. <${process.env.MAIL_USER}.>`,
            to: email,
            subject: title,
            text: body,
        })
        console.timeEnd("send-email");
        console.log("Message ID:", result.messageId);
    }
    catch (e) {
        console.log(`mail sending error: ${e.message}`)
    }
}

module.exports = mailSender