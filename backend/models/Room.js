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
    enum: ["Individual Study Room", "Group Study Room", "Large Group Study Room"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Enabled", "Disabled", "Broken"],
    required: true,
  },
  features: { type: [String] },
  noiseLevel: {
    type: String,
    enum: ["Quiet Zone", "Moderate Noise Zone", "Active/Collaborative Zone"],
    required: true,
  },
  description: { type: String },
});

module.exports = mongoose.model("Room", roomSchema);
