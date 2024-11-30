const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isAuthenticated } = require("../middleware/auth");

// GET all users
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const users = await User.find()
      .populate("reservations", "room startTime endTime")
    //   .populate("equipment", "name status");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all student users
router.get("/student", isAuthenticated, async (req, res) => {
    try {
      const studentUsers = await User.find({ role: "student" })
        .populate("reservations", "room startTime endTime");
      res.json(studentUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;