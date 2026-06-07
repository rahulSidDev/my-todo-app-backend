const Todo = require("../../models/todo");

const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const {title, description} = req.body;

        if (!id || !title || !description) {
            res.status(404).json({
                message: "all fields are required.",
                success: false,
            })
        }

        const response = await Todo.findByIdAndUpdate(
            {_id: id},
            {title: title, description: description, updatedAt: Date.now()}
        );

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

module.exports = updateTodo