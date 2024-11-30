const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

// GET all users
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const users = await User.find()
      .populate("reservations", "room startTime endTime")
      .populate("equipment", "type available dueDate");

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all student users
router.get("/student", isAuthenticated, async (req, res) => {
  try {
    const studentUsers = await User.find({ role: "student" }).populate(
      "reservations",
      "room startTime endTime"
    );
    res.json(studentUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RETRIEVE all equipment assigned to a user
router.get("/:userId/equipment", isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate(
      "equipment",
      "type available dueDate"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD equipment to a user if available
router.post("/:userId/equipment", authorizeRole("faculty"), async (req, res) => {
  try {
    const { userId } = req.params;
    const { type, dueDate } = req.body;

    const equipment = await Equipment.findOne({ type, available: true });
    if (!equipment) {
      return res
        .status(400)
        .json({ message: "Requested equipment type is not available." });
    }

    equipment.available = false;
    equipment.date = new Date();
    equipment.dueDate = dueDate;
    await equipment.save();

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { equipment: equipment._id } },
      { new: true }
    ).populate("equipment", "type available dueDate");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({ message: "Equipment added to user.", equipment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// REMOVE equipment from a user
router.delete(
  "/:userId/equipment/:equipmentId",
  authorizeRole("faculty"),
  async (req, res) => {
    try {
      const { userId, equipmentId } = req.params;

      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { equipment: equipmentId } },
        { new: true }
      ).populate("equipment", "type available dueDate");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const equipment = await Equipment.findByIdAndUpdate(
        equipmentId,
        { available: true, date: null, dueDate: null },
        { new: true }
      );

      if (!equipment) {
        return res.status(404).json({ message: "Equipment not found" });
      }

      res.json({
        message: "Equipment removed from user and marked as available.",
        user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
