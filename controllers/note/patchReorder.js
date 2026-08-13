const Note = require('../../models/note')

module.exports = async (req, res) => {
    try {
        const {reorderedNotes} = req.body
        if (!reorderedNotes) {
            return res.status(400).json({
                success: false,
                message: 'list of newly ordered notes is required.'
            })
        }

        const userID = req.user.id

        const operations = reorderedNotes.map(note => ({
            updateOne: {
                filter: {
                    _id: note.id,
                    user: userID,
                    isTrashed: false
                },
                update: {
                    $set: {
                        order: note.order
                    }
                }
            }
        }));

        const response = await Note.bulkWrite(operations);

        return res.status(200).json({
            success: true,
            message: "Notes reordered successfully."
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: `500 error: ${e.message}`
        })
    }
}