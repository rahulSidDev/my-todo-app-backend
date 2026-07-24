const User = require('../../models/user')
const Note = require('../../models/note')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
        const {password} = req.body
        const userID = req.user.id

        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'all fields are required.'
            })
        }

        const fetchedUser = await User.findById(userID)
        if (!fetchedUser) {
            return res.status(404).json({
                success: false,
                message: 'user does not exist.'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, fetchedUser.password)
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'password is incorrect.'
            })
        }

        Note.deleteMany({user: fetchedUser._id})
        User.findByIdAndDelete(fetchedUser._id)

        return res.status(200).json({
            success: false,
            message: 'successfully deleted user and all corresponding notes.'
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `error: ${e.message}`
        })
    }
}