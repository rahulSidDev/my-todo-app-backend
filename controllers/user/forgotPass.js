const User = require('../../models/user')
const OTP = require('../../models/otp')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
        const {email, newPass, confirmNewPass, otp} = req.body
        if (!email || !newPass || !confirmNewPass || !otp) {
            return res.status(400).json({
                success: false,
                message: 'all fields are required.'
            })
        }

        const fetchedOtp = await OTP.find({
            email,
            purpose: 'forgot-password'
        })
        .sort({createdAt: -1})
        .limit(1)

        if (fetchedOtp.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'otp not found.'
            })
        }

        if (fetchedOtp[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'otp does not match.'
            })
        }

        if (newPass !== confirmNewPass) {
            return res.status(400).json({
                success: false,
                message: 'password and confirm password do not match.'
            })
        }

        const fetchedUser = await User.findOne({email})
        if (!fetchedUser) {
            return res.status(404).json({
                success: false,
                message: 'user is not found.'
            })
        }

        const newPassHash = await bcrypt.hash(newPass, 10)
        
        fetchedUser.password = newPass
        fetchedUser.save()

        return res.status(200).json({
            message: 'successfully changed password.',
            success: true
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `error: ${e.message}`
        })
    }
}