const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const id = req.params.id;
        const userID = req.user.id

        if (!id) {
            res.status(404).json({
                message: "id is required.",
                success: false,
            })
        }

        await Note.findByIdAndUpdate(
            {
                _id: id, 
                user: userID
            },
            {isTrashed: true}
        );

        res.status(200).json({
            message: "successfully moved note to the trash bin",
            success: true,
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
