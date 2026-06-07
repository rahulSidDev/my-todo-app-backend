const Todo = require("../../models/todo");

deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(404).json({
                message: "id is required.",
                success: false,
            })
        }

        await Todo.findByIdAndDelete({_id: id});

        res.status(200).json({
            message: "successfully deleted todo",
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

module.exports = deleteTodo