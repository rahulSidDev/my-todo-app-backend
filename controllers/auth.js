const User = require("../models/user");
const OTP = require("../models/otp")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// !!!!! complete forgot password and reset password.

/*
forgot password flow:
- user doesn't know password so must provide email.
- take the email from the request and verify it exists.
- if it doesn't then return the error.
- if it does then send an otp to user's email and redirect them to the otp verification page.
- the user will enter the correct otp and will be redirected to the page for entering new password.
- the new password will be updated into the db and the user will be redirected to the login page.
*/

/*
reset password flow:
- make the user enter their current password and verify on the backend.
- then make the user enter their new password and then re enter it.
- verify on the backend and update on the db.
*/

// when the user signs up for the first time they should be logged in immediately.
