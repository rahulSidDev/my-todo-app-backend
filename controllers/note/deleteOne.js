const Note = require("../../models/note")

module.exports = async (req, res) => {
    try {
        const id = req.params.id
        const user = req.user
        
        await Note.deleteOne({_id: id, user: user._id, isTrashed: true})
        return res.status(200).json({
            message: true,
            message: 'Successfully deleted note permanently.'
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}