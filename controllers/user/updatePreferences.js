const User = require('../../models/user')

module.exports = async (req, res) => {
    try {
        if (!req.body.name && !req.body.colorPreference) {
            return res.status(400).json({
                success: false,
                message: 'Update fields are required.'
            })
        }

        const user = req.user

        if (req.body.name) {
            user.name = req.body.name
        }
        if (req.body.colorPreference) {
            user.colorPreference = req.body.colorPreference
        }

        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Successfully updated user preferences.',
            data: {
                name: user.name,
                email: user.email,
                colorPreference: user.colorPreference
            }
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}