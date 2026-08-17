const Note = require("../../models/note")

module.exports = async (req, res) => {
    try {
        const user = req.user

        await Note.deleteMany({user: user._id, isTrashed: true})

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted all notes permanently.'
        })        
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}