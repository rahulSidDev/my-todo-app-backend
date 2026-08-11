const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const {title, content} = req.body;
        const userID = req.user.id

        if (!title || !content) {
            return res.status(404).json({
                message: "all fields are required.",
                success: false,
            })
        }

        const lastCreatedNote = await Note.findOne({
            user: userID
        })
        .sort({ order: -1 })

        let lastOrderNo = 1
        if (lastCreatedNote) {
            lastOrderNo = lastCreatedNote.order + 1
        }

        const response = await Note.create({
            title,
            content,
            user: userID,
            order: lastOrderNo
        });

        return res.status(200).json({
            message: "successfully created note",
            success: true,
            data: response.toObject(),
        })
    }
    catch (error) {
        console.log("error: ", error.message);
        return res.status(500).json({
            message: `error is: ${error.message}`,
            success: false,
        })
    }
}