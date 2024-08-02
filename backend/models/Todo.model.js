const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  todo: { type: String, required: true },
  priority: {
    type: String,
    enum: ["HIGH", "MEDIUM", "LOW"],
    required: true,
    default: "LOW",
  },
  status: {
    type: String,
    enum: ["TODO", "IN PROGRESS", "DONE"],
    default: "TODO",
  },
});

module.exports = mongoose.model("Todo", todoSchema);
