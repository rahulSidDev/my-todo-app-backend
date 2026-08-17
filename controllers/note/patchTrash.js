const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user

        await Note.findByIdAndUpdate({
            _id: id,
            user: user._id
        }, {
            isTrashed: true
        });

        res.status(200).json({
            message: "Successfully marked note as trashed.",
            success: true,
        })
    }
    catch (error) {
        res.status(500).json({
            message: `500 error: ${error.message}`,
            success: false,
        })
    }
}
