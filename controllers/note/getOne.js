const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user

        const response = await Note.findOne({_id: id, user: user._id}, '-user');
        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'Note does not exist.'
            })
        }

        res.status(200).json({
            message: "Successfully fetched note.",
            success: true,
            data: response,
        })
    }
    catch (error) {
        res.status(500).json({
            message: `500 error: ${error.message}`,
            success: false,
        })
    }
}
