const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Song = require("./models/Song");

const app = express();

app.use(express.json());
app.use(express.static("public")); // frontend serve

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/spotifyClone")
.then(() => console.log("MongoDB Connected"));

// ROOT route (important)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// CRUD APIs
app.post("/songs", async (req, res) => {
    const song = await Song.create(req.body);
    res.json(song);
});

app.get("/songs", async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
});

app.put("/songs/:id", async (req, res) => {
    const song = await Song.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(song);
});

app.delete("/songs/:id", async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});