const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre",
        required: true
    },
    showTime: {
        type: Date,
        required: true
    },

    ticketPrice: {
        type: Number,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    seats: [
        {
            seatNo: {
                type: String
            },
            status: {
                type: String,
                enum: ["available", "booked"],
                default: "available"
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Show", showSchema);
