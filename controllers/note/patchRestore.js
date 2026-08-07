const Note = require("../../models/note")

module.exports = async (req, res) => {
    try {
        const id = req.params.id
        const userID = req.user.id

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: id,
                user: userID
            },
            {
                isTrashed: false
            },
            {returnDocument: 'after'}
        )

        return res.status(200).json({
            success: true,
            message: 'successfully restored',
            data: updatedNote
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}