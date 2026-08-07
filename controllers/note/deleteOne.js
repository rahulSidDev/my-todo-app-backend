const Note = require("../../models/note")

module.exports = async (req, res) => {
    try {
        const id = req.params.id
        const userID = req.user.id
        
        await Note.deleteOne({
            _id: id,
            user: userID,
            isTrashed: true
        })

        return res.status(200).json({
            message: true,
            message: 'successfully deleted note permanently.'
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}