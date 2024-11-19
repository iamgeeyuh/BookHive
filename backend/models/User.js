const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  profilePhoto: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
});

module.exports = mongoose.model("User", userSchema);
