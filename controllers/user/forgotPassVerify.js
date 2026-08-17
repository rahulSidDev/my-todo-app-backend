const OTP = require("../../models/otp")
const User = require('../../models/user')
const mailSender = require('../../utils/mailSender')
const emailTemplates = require('../../utils/emailTemplates')

module.exports = async (req, res) => {
    try {
        // get email of the user from the req body.
        const {email} = req.body
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required.'
            })
        }

        // email format verification.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format.",
            });
        }

        // verify that the user already exist.
        const response = await User.findOne({email})
        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist.'
            })
        }

        const otpCreateFunc = () => Math.floor(100000 + Math.random() * 900000);
        const otp = otpCreateFunc();

        const otpRes = await OTP.create({
            email: email, 
            otp: otp,
            purpose: 'forgot-password'
        });

        const template = emailTemplates.forgotPasswordOtp(otp);
        await mailSender(
            email,
            template.subject,
            template.text
        );

        return res.status(200).json({
            success: true,
            message: 'successfully sent otp'
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}
