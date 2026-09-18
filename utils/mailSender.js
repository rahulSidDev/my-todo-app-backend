const { Resend } = require("resend");

const resend = new Resend(
    process.env.RESEND_API_KEY
);

const mailSender = async (
    email,
    subject,
    body
) => {

    const { data, error } = await resend.emails.send({
        from: process.env.MAIL_USER,
        to: [email],
        subject,
        text: body
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

module.exports = mailSender;