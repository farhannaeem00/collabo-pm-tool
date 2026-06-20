const express = require("express");
const router = express.Router();
const {
  createTask,
  getProjectTasks,
  getTask,
  updateTask,
  deleteTask,
  moveTask,
  addComment,
  toggleSubtask,
  aiGenerateSubtasks,
  aiGenerateDescription,
  aiEstimateTime,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", createTask);
router.get("/project/:projectId", getProjectTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.put("/:id/move", moveTask);
router.post("/:id/comments", addComment);
router.put("/:id/subtasks/:subtaskId/toggle", toggleSubtask);
router.post("/:id/ai/subtasks", aiGenerateSubtasks);
router.post("/ai/description", aiGenerateDescription);
router.post("/:id/ai/estimate", aiEstimateTime);

module.exports = router;