const User = require("../../models/user");
const OTP = require("../../models/otp")

const otpCreation = async (req, res) => {
    try {
        // get email of the user from the req body.
        const {email} = req.body

        // email format verification.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
            });
        }

        // verify that the user doesn't already exist.
        const response = await User.find({email})

        if (response.length !== 0) {
            return res.status(404).json({
                success: false,
                message: 'user already exists.'
            })
        }

        // generate otp
        const otpCreateFunc = () => Math.floor(100000 + Math.random() * 900000);
        const otp = otpCreateFunc();

        const otpRes = await OTP.create({email: email, otp: otp});

        return res.status(200).json({
            success: true,
            message: 'otp sent successfully.',
            data: otpRes
        })
    }
    catch (e) {
        console.log(e.message)
        return res.status(500).json({
            success: false,
            message: `error: ${e.message}`
        })
    }
}

module.exports = otpCreation