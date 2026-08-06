const User = require('../../models/user')

module.exports = async (req, res) => {
    try {
        const updateFields = {}

        if (req.body.name) {
            updateFields.name = req.body.name
        }
        if (req.body.email) {
            updateFields.email = req.body.email
            const fetchedUser = await User.findOne({email: updateFields.email})
            if (fetchedUser) {
                return res.status(400).json({
                    success: false,
                    message: 'email already used by someone else.'
                })
            }
        }
        if (req.body.colorPreference) {
            updateFields.colorPreference = req.body.colorPreference
        }

        if (JSON.stringify(updateFields) === '{}') {
            return res.status(400).json({
                success: false,
                message: 'update fields are required.'
            })
        }

        const id = req.user.id
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateFields,
            {returnDocument: 'after'}
        )

        return res.status(200).json({
            success: true,
            message: 'successfully updated user',
            data: {
                name: updatedUser.name,
                email: updatedUser.email,
                colorPreference: updatedUser.colorPreference
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