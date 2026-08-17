const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.myCookie

        // validation
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User is not logged in.",
            })
        }

        const decode = jwt.verify(token, process.env.SECRET)
        const userID = decode.id
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: 'User ID does not exist in the cookie.'
            })
        }

        //check whether the user exists in db or not.
        const fetchedUser = await User.findOne({_id: userID})
        if (!fetchedUser) {
            return res.status(404).json({
                success: false,
                message: 'No user found for the corresponding token.'
            })
        }

        req.user = fetchedUser

        next()
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: `500 error: ${error.message}`
        })
    }
}