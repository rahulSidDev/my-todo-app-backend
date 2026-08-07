const Note = require('../../models/note')

module.exports = async (req, res) => {
    try {
        const userID = req.user.id

        const fetchedNotes = await Note.find({
            user: userID,
            isTrashed: true
        })

        if (fetchedNotes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'no notes exist.'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'successfully fetched trashed notes.',
            data: fetchedNotes
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}