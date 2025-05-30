const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [String],
  completed: { type: Boolean, default: false },
  hidden: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
