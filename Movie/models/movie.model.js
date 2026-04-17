const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    duration: {
        type: String,
    },
    genre: [String],
    language: String,
    releaseDate: Date,
    movieImage: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
