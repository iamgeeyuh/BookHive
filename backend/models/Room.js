const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  capacity: { type: Number, required: true },
  type: {
    type: String,
    enum: ["meeting", "conference", "study"],
    required: true,
  },
  status: { type: String, enum: ["available", "unavailable"], required: true },
  features: { type: [String] },
  noiseLevel: { type: String, enum: ["low", "medium", "high"] },
});

module.exports = mongoose.model("Room", roomSchema);
