const User = require("../../models/user");
const OTP = require("../../models/otp")
const mailSender = require('../../utils/mailSender')
const emailTemplates = require('../../utils/emailTemplates')

module.exports = async (req, res) => {
    try {
        // get email of the user from the req body.
        const {name, email, password, confirmPass} = req.body
        if (!name || !email || !password || !confirmPass) {
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
                success: false
            });
        }

        //password and confirm password checking
        if(password !== confirmPass) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password dont match.",
            })
        }

        // verify that the user doesn't already exist.
        const response = await User.findOne({email})
        if (response) {
            return res.status(400).json({
                success: false,
                message: 'User already exists.'
            })
        }

        // generate otp
        const otpCreateFunc = () => Math.floor(100000 + Math.random() * 900000);
        const otp = otpCreateFunc();

        const otpRes = await OTP.create({
            email: email, 
            otp: otp,
            purpose: 'signup'
        });

        const template = emailTemplates.signupOtp(otp);
        await mailSender(
            email,
            template.subject,
            template.text
        );

        return res.status(200).json({
            success: true,
            message: 'Otp sent successfully.',
            expiresAt: new Date(otpRes.createdAt.getTime() + 5 * 60 * 1000)
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}
