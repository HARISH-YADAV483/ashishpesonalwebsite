const mongoose = require("mongoose");

const hobbySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, default: "General" },
        imageUrl: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Hobby", hobbySchema);
