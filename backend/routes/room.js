const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

// CREATE a new room
router.post("/", authorizeRole("faculty"), async (req, res) => {
  try {
    const { number, capacity, type, status, features, noiseLevel, description } = req.body;

    const room = new Room({
      number,
      capacity,
      type,
      status,
      features,
      noiseLevel,
      description
    });

    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// RETRIEVE all rooms
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RETRIEVE a single room by ID
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a room by ID
router.put("/:id", authorizeRole("faculty"), async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
