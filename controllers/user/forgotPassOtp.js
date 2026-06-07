const OTP = require('../../models/otp')

const forgotPassOtp = async (req, res) => {
    try {
        const otp = req.body.otp
        const email = req.body.email

        if (!otp || !email) {
            return res.status(404).json({
                success: false,
                message: 'all fields are required.'
            })
        }

        const fetchedOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1)

        if (fetchedOtp[0].otp !== otp) {
            return res.status(404).json({
                success: false,
                message: 'otp does not match.'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'otp is correct.'
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `error: ${e.message}`
        })
    }
}

module.exports = forgotPassOtp