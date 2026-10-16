const User = require('../../models/user')
const OTP = require('../../models/otp')

module.exports = async (req, res) => {
    try {
        const {email, otp} = req.body
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
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

        const fetchedUser = await User.findOne({
            email: fetchedOtp[0].data.email
        })
        
        fetchedUser.password = fetchedOtp[0].data.newPassHash
        await fetchedUser.save()

        return res.status(200).json({
            message: 'Successfully changed password.',
            success: true
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `${e.message}`
        })
    }
}