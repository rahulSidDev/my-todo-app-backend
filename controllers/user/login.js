const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        // fetch the data frokm request body
        const {email, password} = req.body
        
        // validate the data
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "all fields are required.",
            })
        }

        // check whether the user exists
        const user = await User.find({email: email});

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user doesn't exists.",
            })
        }

        // if the user exists then compare the passwords.
        if (await bcrypt.compare(password, user[0].password)) {
            // jwt token creation
            const payload = {
                email: user[0].email,
                name: user[0].name,
                id: user[0]._id,
            }

            const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "2h"});

            const options = {
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("myCookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message:"Logged in successfully",
            })
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Wrong password, try again",
            })
        }
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: `error message: ${error.message}`,
        })
    }
}

module.exports = login