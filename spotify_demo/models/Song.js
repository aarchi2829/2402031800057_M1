const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songName: String,
    artist: String,
    duration: String
});

module.exports = mongoose.model("Song", songSchema);