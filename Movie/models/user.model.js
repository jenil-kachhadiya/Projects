const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
