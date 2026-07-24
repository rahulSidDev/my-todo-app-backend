const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const userID = req.user.id
        const {title, content} = req.body;

        if (!id || !title || !content) {
            res.status(404).json({
                message: "all fields are required.",
                success: false,
            })
        }

        const fetchedNote = await Note.findOne({
            _id: id,
            user: userID
        })

        if (!fetchedNote) {
            return res.status(404).json({
                success: false,
                message: 'note not found.'
            })
        }

        fetchedNote.title = title || fetchedNote.title
        fetchedNote.content = content || fetchedNote.content

        const updatedNote = await fetchedNote.save()

        res.status(200).json({
            message: "successfully created note",
            success: true,
            data: updatedNote,
        })
    }
    catch (error) {
        console.log("error: ", error.message);
        res.status(500).json({
            message: `error is: ${error.message}`,
            success: false,
        })
    }
}
