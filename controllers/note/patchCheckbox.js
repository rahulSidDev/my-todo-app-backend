const Note = require("../../models/note")

module.exports = async (req, res) => {
    try {
        const contentID = req.body.contentID
        if (!contentID) {
            return res.status(400).json({
                success: false,
                message: 'content id is required.'
            })
        }

        const id = req.params.id
        const userID = req.user.id

        const fetchedNote = await Note.findOne({
            _id: id, 
            user: userID
        }, '-user')
        .populate('content')

        if (!fetchedNote) {
            return res.status(404).json({
                success: false,
                message: 'note does not exist.'
            })
        }

        fetchedNote.content = fetchedNote.content.map(item => {
            if (item._id.toString() === contentID && item.type === 'checklist') {
                item.completed = !item.completed
            }
            return item
        })

        fetchedNote.save()

        return res.status(200).json({
            success: true,
            message: 'successfully updated note content.',
            data: fetchedNote
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}