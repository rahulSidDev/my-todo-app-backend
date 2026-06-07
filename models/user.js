const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Users", userSchema);