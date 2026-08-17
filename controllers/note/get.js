const Note = require("../../models/note");

module.exports = async (req, res) => {
    try {
        const {search} = req.query
        let query = {user: req.user._id, isTrashed: false}
        
        if (search) {
            query.$or = [
                {
                    title: { $regex: search, $options: 'i' }
                },
                {
                    "content.content": { $regex: search, $options: 'i' }
                }
            ]
        }
        
        const response = await Note.find(query, '-user').sort({order: 1});
        
        if (response.length === 0) {
            return res.status(200).json({
                message: "No notes present for the user.",
                success: true,
                data: []
            })
        }
        
        return res.status(200).json({
            message: "Successfully fetched all notes.",
            success: true,
            data: response,
        })
    }
    catch (error) {
        return res.status(500).json({
            message: `500 error: ${error.message}`,
            success: false,
        })
    }
}
