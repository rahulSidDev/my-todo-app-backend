const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const {title, content} = req.body;
        
        if (!title || !content) {
            res.status(400).json({
                message: "All fields are required.",
                success: false,
            })
        }
        
        const id = req.params.id;
        const user = req.user

        const fetchedNote = await Note.findOne({_id: id, user: user._id})
        if (!fetchedNote) {
            return res.status(404).json({
                success: false,
                message: 'Note does not exist.'
            })
        }

        fetchedNote.title = title || fetchedNote.title
        fetchedNote.content = content || fetchedNote.content
        const updatedNote = await fetchedNote.save()

        res.status(200).json({
            message: "Successfully updated note.",
            success: true,
            data: updatedNote,
        })
    }
    catch (error) {
        res.status(500).json({
            message: `500 error: ${error.message}`,
            success: false,
        })
    }
}
