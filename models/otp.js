const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60
    }
})

//here we define pre save middleware for sending mail first before saving otp in DB
//in pre-save middleware function we call the mail sender function.

otpSchema.pre('save', async function (next) {
    await mailSender(this.email, "Verification Email. MyTodo App.", this.otp);
})

module.exports = mongoose.model("OTPs", otpSchema)