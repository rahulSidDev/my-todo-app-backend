const Todo = require("../../models/todo");

module.exports = async (req, res) => {
    try {
        const {title, description} = req.body;
        const userID = req.user.id

        if (!title || !description) {
            return res.status(404).json({
                message: "all fields are required.",
                success: false,
            })
        }

        const response = await Todo.create({title: title, description: description, user: userID});

        return res.status(200).json({
            message: "successfully created todo",
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