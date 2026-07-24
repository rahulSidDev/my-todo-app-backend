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
    password: {
        type: String,
        required: true,
    },
    colorPreference: {
        type: String,
        enum: ['pink', 'yellow', 'alternate'],
        default: 'pink'
    }
})

module.exports = mongoose.model("Users", userSchema);