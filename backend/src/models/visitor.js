const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    date: { type: String, required: true }, // format: YYYY-MM-DD
}, { timestamps: true });

// Compound index to ensure one entry per IP per day
visitorSchema.index({ ip: 1, date: 1 }, { unique: true });

const Visitor = mongoose.model('Visitor', visitorSchema);
module.exports = Visitor;
