const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  type: { type: String },
  available: { type: Boolean, default: true },
  date: { type: Date },
  dueDate: { type: Date },
});

module.exports = mongoose.model("Equipment", equipmentSchema);
