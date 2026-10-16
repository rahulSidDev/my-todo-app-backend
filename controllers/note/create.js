const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const {title, content} = req.body;
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
            message: `${error.message}`,
            success: false,
        })
    }
}