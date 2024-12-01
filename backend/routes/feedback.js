const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

// CREATE new feedback
router.post("/", authorizeRole("student"), async (req, res) => {
  try {
    const { user, description, subject, attachments } = req.body;

    const feedback = new Feedback({
      user,
      description,
      subject,
      attachments,
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// RETRIEVE all feedback
router.get("/", authorizeRole("faculty"), async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "firstName lastName email")
      .sort({ date: -1 }); 
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE specific feedback
router.put("/:id", authorizeRole("faculty"), async (req, res) => {
  try {
    const { read } = req.body;

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { read },
      {
        new: true,
        runValidators: true,
      }
    ).populate("user", "firstName lastName email");

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// RETRIEVE all feedback by a specific user
router.get("/user/:userId", isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.params;

    const userFeedbacks = await Feedback.find({ user: userId })
      .populate("user", "firstName lastName email")
      .sort({ date: -1 });

    if (!userFeedbacks || userFeedbacks.length === 0) {
      return res
        .status(404)
        .json({ message: "No feedback found for this user." });
    }

    res.json(userFeedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
