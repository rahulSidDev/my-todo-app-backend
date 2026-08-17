const OTP = require('../../models/otp')
const User = require('../../models/user')

module.exports = async (req, res) => {
    try {
        const {newEmail, otp} = req.body
        if (!newEmail || !otp) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            })
        }

        const fetchedOtp = await OTP.findOne({
            email: newEmail,
            purpose: 'update-email'
        })

        if (!fetchedOtp) {
            return res.status(404).json({
                success: false,
                message: 'Otp not found in database.'
            })
        }

        if (fetchedOtp.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Otp is incorrect.'
            })
        }

        const user = req.user
        user.email = newEmail
        await user.save()

        return res.status(200).json({
            success: false,
            message: 'Successfully updated email.'
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}