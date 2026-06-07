const User = require("../../models/user");

const profile = async(req, res) => {
    try {
        const userID = req.user.id
        
        if (!userID) {
            return res.status(404).json({
                success: false,
                message: "didn't receive user id."
            })
        }

        const user = await User.find({_id: userID})

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "couldn't find user."
            })
        }

        return res.status(200).json({
            success: true,
            message: 'successfully retreived user',
            data: user
        })
    }
    catch (e) {
        console.log(e.message)
        return res.status(500).json({
            success: false,
            message: `error: ${e.message}`
        })
    }
}

module.exports = profile