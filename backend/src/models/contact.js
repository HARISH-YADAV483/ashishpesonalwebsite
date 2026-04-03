const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: String,
        lastname: String,
        email: String,
        phone: Number,
        message: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("ashuser", contactSchema);