const OTP = require("../../models/otp")
const User = require('../../models/user')
const mailSender = require('../../utils/mailSender')
const emailTemplates = require('../../utils/emailTemplates')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
        // get email of the user from the req body.
        const {email, newPass, confirmNewPass} = req.body
        if (!email || !newPass || !confirmNewPass) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            })
        }

        // email format verification.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format.",
            });
        }

        const errors = passwordValidator(password)
        if (errors.length !== 0) {
            return res.status(400).json({
                success: false,
                message: errors
            })
        }

        if (newPass !== confirmNewPass) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirm new password do not match.'
            })
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

        const newPassHash = await bcrypt.hash(newPass, 10)
        const otpRes = await OTP.create({
            email: email, 
            otp: otp,
            purpose: 'forgot-password',
            data: {email, newPassHash}
        });

        const template = emailTemplates.forgotPasswordOtp(otp);
        await mailSender(
            email,
            template.subject,
            template.text
        );

        return res.status(200).json({
            success: true,
            message: 'Successfully sent otp.',
            expiresAt: new Date(otpRes.createdAt.getTime() + 5 * 60 * 1000)
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `${e.message}`
        })
    }
}
