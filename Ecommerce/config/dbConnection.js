const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://jenil:jenil45@jenil-backend.qwdnoji.mongodb.net/shop");
        console.log("DB Connected");
    } catch (err) {
        console.log(err);
    }
};
module.exports = connectDB;