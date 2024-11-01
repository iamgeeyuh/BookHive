const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true, },
  firstName: { type: String, required: true, },
  lastName: { type: String, required: true, },
  profilePhoto: { type: String, required: true, },
  role: {type: String, required: true,},
});

const User = mongoose.model("User", userSchema);

module.exports = User;