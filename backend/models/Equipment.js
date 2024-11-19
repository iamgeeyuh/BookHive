const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  available: { type: Boolean, default: true },
  date: { type: Date },
  dueDate: { type: Date },
});

module.exports = mongoose.model("Equipment", equipmentSchema);
