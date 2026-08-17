const OTP = require("../../models/otp")
const User = require('../../models/user')
const mailSender = require('../../utils/mailSender')
const emailTemplates = require('../../utils/emailTemplates')

module.exports = async (req, res) => {
    try {
        const {newEmail} = req.body
        if (!newEmail) {
            return res.status(400).json({
                success: false,
                message: 'New email is required.'
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }

        const user = req.user
        if (newEmail === user.email) {
            return res.status(400).json({
                success: false,
                message: 'New email is the same as the old one.'
            })
        }

        const emailExists = await User.findOne({
            email: newEmail,
            _id: {$ne: user.id}
        })
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'Email already taken by another user.'
            })
        }

        const otpCreateFunc = () => Math.floor(100000 + Math.random() * 900000);
        const otp = otpCreateFunc();
        
        const result = await OTP.create({
            otp: otp,
            email: newEmail,
            purpose: 'update-email'
        })

        const template = emailTemplates.emailChangeOtp(otp);
        await mailSender(
            email,
            template.subject,
            template.text
        );

        return res.status(200).json({
            success: true,
            message: 'Successfully sent otp to new email.'
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}