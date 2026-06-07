const Todo = require("../../models/todo");

const createTodo = async (req, res) => {
    try {
        const {title, description} = req.body;
        const userID = req.user.id

        if (!title || !description) {
            res.status(404).json({
                message: "all fields are required.",
                success: false,
            })
        }

        const response = await Todo.create({title: title, description: description, user: userID});

        res.status(200).json({
            message: "successfully created todo",
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

module.exports = createTodo