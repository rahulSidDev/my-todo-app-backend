const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['text', 'checklist', 'list'],
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean
    }
})

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: [blockSchema],
        default: []
    },
    order: {
        type: Number,
        required: true,
    },
    isTrashed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Notes", noteSchema);