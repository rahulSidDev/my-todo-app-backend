const nodemailer = require('nodemailer')

const mailSender = async (email, title, body) => {
    try {
        //console.log(email, title, body)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const sentmailInfo = await transporter.sendMail({
            from: `MyTodo App. <${process.env.MAIL_USER}.>`,
            to: email,
            subject: title,
            html: body,
        })

        console.log(`mail sent: ${sentmailInfo.response}`)
    }
    catch (e) {
        console.log(`mail sending error: ${e.message}`)
    }
}

module.exports = mailSender