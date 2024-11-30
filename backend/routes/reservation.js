const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

// CREATE a new reservation
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { room, user, startTime, endTime } = req.body;

    const conflict = await Reservation.findOne({
      room,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
      ],
    });

    if (conflict) {
      return res.status(400).json({
        message: "This room is already reserved during the selected time.",
      });
    }

    const reservation = new Reservation({
      room,
      user,
      startTime,
      endTime,
    });

    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// RETRIEVE all reservations
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("room", "number")
      .populate("user", "firstName lastName");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RETRIEVE a single reservation by ID
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("room", "number")
      .populate("user", "firstName lastName");
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a reservation by ID
router.put("/:id", authorizeRole("faculty"), async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("room", "number")
      .populate("user", "firstName lastName");

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a reservation by ID
router.delete("/:id", authorizeRole("faculty"), async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
