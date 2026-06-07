const User = require('../../models/user')
const bcrypt = require('bcrypt')

const resetPassword = async (req, res) => {
    try {
        // get the password and confirm password from req body
        const {password, confirmPass} = req.body
        const user = req.user.id

        if (!password || !confirmPass) {
            return res.status(404).json({
                success: false,
                message: 'both password and confirmed password are required'
            })
        }

        if (password !== confirmPass) {
            return res.status(404).json({
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

        // hash the password and update it into the db
        const hashedPass = await bcrypt.hash(password, 10);

        fetchedUser.password = hashedPass
        await fetchedUser.save()

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

module.exports = resetPassword