const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.myCookie || req.body.token

        // validation
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "token is missing.",
            })
        }

        // verify token
        try {
            const decode = jwt.verify(token, process.env.SECRET)
            req.user = decode
        }
        catch (error) {
            return res.status(404).json({
                success: false,
                message: 'token invalid.'
            })
        }

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