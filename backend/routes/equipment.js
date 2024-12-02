const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");
const User = require("../models/User");
const { authorizeRole } = require("../middleware/auth");

// GET all equipment
router.get("/", authorizeRole("faculty"), async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (error) {
    console.error("Error retrieving equipment:", error);
    res.status(500).json({ error: "Failed to retrieve equipment" });
  }
});

// POST new equipment
router.post("/", async (req, res) => {
  try {
    const { type, available, date, dueDate } = req.body;

    const newEquipment = new Equipment({
      type,
      available,
      date,
      dueDate,
    });

    const savedEquipment = await newEquipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    console.error("Error adding equipment:", error);
    res.status(400).json({ error: "Failed to add equipment" });
  }
});

// GET all borrowed equipment with user details
router.get("/borrowed", authorizeRole("faculty"), async (req, res) => {
    try {
      // Find borrowed equipment sorted by dueDate
      const borrowedEquipment = await Equipment.find({ available: false }).sort({ dueDate: 1 });
  
      // Populate user information for each borrowed equipment
      const borrowedWithUsers = await Promise.all(
        borrowedEquipment.map(async (equipment) => {
          const user = await User.findOne({ equipment: equipment._id }).select(
            "firstName lastName email"
          );
          return { equipment, user };
        })
      );
  
      res.status(200).json(borrowedWithUsers);
    } catch (error) {
      console.error("Error retrieving borrowed equipment:", error);
      res.status(500).json({ error: "Failed to retrieve borrowed equipment" });
    }
  });

module.exports = router;
