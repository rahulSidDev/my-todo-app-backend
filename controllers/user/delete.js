const User = require('../../models/user')
const Note = require('../../models/note')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    try {
        const {password} = req.body
        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'Password for the user is required.'
            })
        }
        
        const user = req.user

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect.'
            })
        }
        
        await Note.deleteMany({user: user._id})
        await User.findByIdAndDelete(user._id)

        res.clearCookie('myCookie')

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted user and all corresponding notes.'
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}