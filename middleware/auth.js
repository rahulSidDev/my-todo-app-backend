const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.myCookie

        // validation
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "user is not logged in.",
            })
        }

        const decode = jwt.verify(token, process.env.SECRET)
        req.user = decode

        next()
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: `the error is: ${error.message}`
        })
    }
}