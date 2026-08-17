const Note = require('../../models/note')

module.exports = async (req, res) => {
    try {
        const user = req.user

        const fetchedNotes = await Note.find({user: user._id, isTrashed: true})
        if (fetchedNotes.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No trashed notes exist.'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched trashed notes.',
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