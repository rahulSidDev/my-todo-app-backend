const User = require('../../models/user')
const OTP = require('../../models/otp')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
        const {email, newPass, confirmNewPass, otp} = req.body
        if (!email || !newPass || !confirmNewPass || !otp) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            })
        }

        if (newPass !== confirmNewPass) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirm new password do not match.'
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
                message: 'Otp no longer exists.'
            })
        }

        if (fetchedOtp[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Otp does not match.'
            })
        }

        const fetchedUser = await User.findOne({email})
        const newPassHash = await bcrypt.hash(newPass, 10)
        
        fetchedUser.password = newPassHash
        await fetchedUser.save()

        return res.status(200).json({
            message: 'successfully changed password.',
            success: true
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}