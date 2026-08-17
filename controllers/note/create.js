const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const {title, content} = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            })
        }
        
        const user = req.user

        const lastCreatedNote = await Note.findOne({
            user: user._id
        })
        .sort({ order: -1 })

        let lastOrderNo = 1
        if (lastCreatedNote) {
            lastOrderNo = lastCreatedNote.order + 1
        }

        const response = await Note.create({
            title,
            content,
            user: user._id,
            order: lastOrderNo
        });

        return res.status(200).json({
            message: "Successfully created note.",
            success: true,
            data: response.toObject(),
        })
    }
    catch (error) {
        return res.status(500).json({
            message: `500 error: ${error.message}`,
            success: false,
        })
    }
}