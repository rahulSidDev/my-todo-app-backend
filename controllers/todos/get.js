const Todo = require("../../models/todo");

const getTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const userID = req.user.id

        if (!id) {
            res.status(404).json({
                message: "id is required.",
                success: false,
            })
        }

        const response = await Todo.findById({_id: id});

        if (userID !== response.user.toString()) {
            return res.status(404).json({
                message: 'user does not match',
                success: false
            })
        }

        res.status(200).json({
            message: "successfully found todo.",
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

module.exports = getTodo