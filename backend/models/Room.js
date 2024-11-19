const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  capacity: {
    type: String,
    enum: ["1-2", "5", "8"],
    required: true,
  },
  type: {
    type: String,
    enum: ["individual", "group", "large group"],
    required: true,
  },
  status: {
    type: String,
    enum: ["enabled", "disabled", "broken"],
    required: true,
  },
  features: { type: [String] },
  noiseLevel: {
    type: String,
    enum: ["quiet", "moderate", "active"],
    required: true,
  },
  description: { type: String },
});

module.exports = mongoose.model("Room", roomSchema);
