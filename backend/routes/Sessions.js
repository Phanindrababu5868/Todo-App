const express = require("express");
const router = express.Router();
const Session = require("../models/Session.model");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.userId });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve sessions" });
  }
});

module.exports = router;
