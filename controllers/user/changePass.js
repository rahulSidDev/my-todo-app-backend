const User = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
        // get the password and confirm password from req body
        const {password, newPass, confirmNewPass} = req.body
        if (!password || !newPass || !confirmNewPass) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            })
        }

        if (newPass !== confirmNewPass) {
            return res.status(400).json({
                success: false,
                message: 'New password and Confirm new password do not match.'
            })
        }

        const user = req.user
        const isUserVerified = await bcrypt.compare(password, user.password)
        if (!isUserVerified) {
            return res.status(401).json({
                success: false,
                message: 'The password entered for the user is incorrect.'
            })
        }

        // hash the password and update it into the db
        const hashedNewPass = await bcrypt.hash(newPass, 10);

        user.password = hashedNewPass
        await user.save()

        res.clearCookie('myCookie')

        return res.status(200).json({
            message: 'Successfully changed password.',
            success: true
        })
    }
    catch (e) {
        return res.status(500).json({
            message: `500 error: ${e.message}`,
            success: false
        })
    }
}
