const User = require("../../models/user");
const OTP = require("../../models/otp")
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    try {
        const {name, email, password, confirmPass, otp} = req.body;
        if (!name || !email || !password || !confirmPass || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            })
        }

        //password and confirm password checking
        if(password !== confirmPass) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password dont match.",
            })
        }

        //fetch the most recent otp for the corresponding email from DB and then verify it.
        const recentOtp = await OTP.find({
            email, 
            purpose: 'signup'
        })
        .sort({createdAt: -1})
        .limit(1)

        if(recentOtp.length === 0) {
            return res.status(404).json({
                success: false,
                message: "OTP no longer exists.",
            })
        } else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success: false,
                message: "OTP does not match.",
            })
        }

        // create the password hash, make the DB user entry and return success response.
        const hashedPass = await bcrypt.hash(password, 10);

        const userData = await User.create({
            name: name,
            email: email,
            password: hashedPass,
        })

        return res.status(200).json({
            message: "Successfully signed up new user.",
            success: true
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `500 error: ${error.message}`
        })
    }
}
