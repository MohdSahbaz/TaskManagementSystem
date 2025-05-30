const express = require("express");
const router = express.Router();
const {
  getTasksAssignedToUser,
  addCommentAndCompleteTask,
  deleteTask,
  hideTask,
  getTasksAssignedByAdmin,
  assignTaskByUsername,
} = require("../controllers/taskController");

router.get("/user/:userId", getTasksAssignedToUser);
router.put("/comment-complete/:taskId", addCommentAndCompleteTask);
router.delete("/delete/:taskId", deleteTask);
router.patch("/hide/:taskId", hideTask);
router.get("/admin/assignedby/:adminId", getTasksAssignedByAdmin);
router.post("/assign", assignTaskByUsername);

module.exports = router;
