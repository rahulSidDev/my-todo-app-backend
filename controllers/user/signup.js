const User = require("../../models/user");
const OTP = require("../../models/otp")
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const {name, email, phone, address, password, confirmPass, otp} = req.body;

        if (!name || !email || !password || !confirmPass || !otp) {
            return res.status(404).json({
                success: false,
                message: "all fields are required",
            })
        }

        //password and confirm password checking
        if(password !== confirmPass) {
            return res.status(404).json({
                success: false,
                message: "password and confirm password dont match",
            })
        }

        //fetch the most recent otp for the corresponding email from DB and then verify it.
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1)

        if(recentOtp.length == 0) {
            return res.status(404).json({
                success: false,
                message: "OTP not found",
            })
        } else if(otp !== recentOtp[0].otp){
            return res.status(404).json({
                success: false,
                message: "OTp does not match",
            })
        }

        // create the password hash, make the DB user entry and return success response.
        const hashedPass = await bcrypt.hash(password, 10);

        const userData = await User.create({
            name: name,
            email: email,
            phone: phone,
            address: address,
            password: hashedPass,
        })

        return res.status(200).json({
            message: "successfully added new user.",
            success: true,
            data: userData,
        })
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: `error message: ${error.message}`
        })
    }
}

module.exports = signup
