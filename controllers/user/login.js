const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required.",
			});
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format.",
            });
        }

		const fetchedUser = await User.findOne({email})
		if (!fetchedUser) {
			return res.status(404).json({
				success: false,
				message: "User doesn't exist.",
			});
		}

		const isMatch = await bcrypt.compare(password, fetchedUser.password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Wrong password.",
			});
		}

		const token = jwt.sign(
			{
				email: fetchedUser.email,
				name: fetchedUser.name,
				id: fetchedUser._id,
			},
			process.env.SECRET,
			{ expiresIn: "24h" }
		);

		res.cookie("myCookie", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		});

		return res.status(200).json({
			success: true,
			token,
			user: {
				email: fetchedUser.email,
				name: fetchedUser.name,
				colorPreference: fetchedUser.colorPreference
			},
			message: "Logged in successfully.",
		});
	}
	catch (error) {
		return res.status(500).json({
			success: false,
			message: `500 error: ${error.message}`,
		});
	}
};