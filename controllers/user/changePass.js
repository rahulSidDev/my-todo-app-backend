const User = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
        // get the password and confirm password from req body
        const {password, newPass, confirmNewPass} = req.body
        const user = req.user.id

        if (!password || !newPass || !confirmNewPass) {
            return res.status(400).json({
                success: false,
                message: 'all fields are required.'
            })
        }

        if (password !== confirmNewPass) {
            return res.status(400).json({
                success: false,
                message: 'password and confirm password do not match'
            })
        }

        // fetch the user from DB.
        const fetchedUser = await User.findById({_id: userID})

        if (!fetchedUser) {
            return res.status(404).json({
                success: false,
                message: 'user does not exists'
            })
        }

        const isUserVerified = await bcrypt.compare(password, fetchedUser.password)
        if (!isUserVerified) {
            return res.status(401).json({
                success: false,
                message: 'password entered is incorrect.'
            })
        }

        // hash the password and update it into the db
        const hashedPass = await bcrypt.hash(password, 10);

        fetchedUser.password = hashedPass
        await fetchedUser.save()

        res.clearCookie('myCookie')

        return res.status(200).json({
            message: 'successfully saved new password',
            success: true
        })
    }
    catch (e) {
        return res.status(500).json({
            message: `error: ${e.message}`,
            success: false
        })
    }
}
