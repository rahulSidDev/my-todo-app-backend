const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const userID = req.user.id
        const response = await Note.find({user: userID});

        if (response.length === 0) {
            res.status(404).json({
                message: "no notes present.",
                success: false,
            })
        }

        res.status(200).json({
            message: "successfully fetched all notes",
            success: true,
            data: response,
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
