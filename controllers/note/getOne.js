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

        const response = await Note.findById({_id: id});

        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'note does not exist.'
            })
        }

        if (userID !== response.user.toString()) {
            return res.status(404).json({
                message: 'user does not match',
                success: false
            })
        }

        res.status(200).json({
            message: "successfully found note.",
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
