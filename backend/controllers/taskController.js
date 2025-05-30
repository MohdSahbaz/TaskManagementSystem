const Task = require("../models/Task");
const User = require("../models/User");
const mongoose = require("mongoose");

// Get all tasks assigned to a specific user
const getTasksAssignedToUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const tasks = await Task.find({
      assignedTo: userId,
      hidden: false,
    }).populate("assignedTo", "username");

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks for user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add a comment to a task and optionally mark it completed
const addCommentAndCompleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { comment, completed } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Add comment if provided
    if (comment) {
      task.comments.push(comment);
    }

    // Update completion status if provided
    if (typeof completed === "boolean") {
      task.completed = completed;
    }

    await task.save();

    res.status(200).json({ success: true, message: "Task updated", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Hide a task by setting hidden = true
const hideTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    task.hidden = true;
    await task.save();

    res
      .status(200)
      .json({ success: true, message: "Task hidden successfully", task });
  } catch (error) {
    console.error("Error hiding task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all tasks
const getTasksAssignedByAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;

    const tasks = await Task.find({ assignedBy: adminId })
      .populate("assignedTo", "username")
      .populate("assignedBy", "username");

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks assigned by admin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Controller to assign task by admin
const assignTaskByUsername = async (req, res) => {
  try {
    const { adminId, title, description, assignedToUsername } = req.body;

    // Validate input
    if (!adminId || !title || !description || !assignedToUsername) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find the user by username
    const assignedUser = await User.findOne({ username: assignedToUsername });
    if (!assignedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User to assign task not found" });
    }

    // Create new task
    const newTask = new Task({
      title,
      description,
      assignedBy: new mongoose.Types.ObjectId(adminId),
      assignedTo: assignedUser._id,
      completed: false,
      hidden: false,
    });

    await newTask.save();

    return res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    console.error("Error assigning task:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getTasksAssignedToUser,
  addCommentAndCompleteTask,
  deleteTask,
  hideTask,
  getTasksAssignedByAdmin,
  assignTaskByUsername,
};
