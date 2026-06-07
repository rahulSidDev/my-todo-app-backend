const Todo = require("../../models/todo");

const getAllTodos = async (req, res) => {
    try {
        const userID = req.user.id
        const response = await Todo.find({user: userID});

        if (!response) {
            res.status(404).json({
                message: "no todos present.",
                success: false,
            })
        }

        res.status(200).json({
            message: "successfully fetched all todos",
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

module.exports = getAllTodos