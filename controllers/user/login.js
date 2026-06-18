const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        id: user._id,
      },
      process.env.SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("myCookie", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      message: "Logged in successfully",
    });
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
    success: false,
    message: error.message,
  });
  }
};

module.exports = login