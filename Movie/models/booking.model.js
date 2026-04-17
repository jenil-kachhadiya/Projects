const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
        required: true
    },
    seats: [
        {
            type: String
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    isDelete: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);