const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  subject: { type: String },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  attachments: { type: [String] }, // URLs or file paths
});

module.exports = mongoose.model("Feedback", feedbackSchema);
