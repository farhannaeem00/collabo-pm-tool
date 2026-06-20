const express = require("express");
const router = express.Router();
const {
  createProject,
  getWorkspaceProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectStats,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", createProject);
router.get("/workspace/:workspaceId", getWorkspaceProjects);
router.get("/:id", getProject);
router.get("/:id/stats", getProjectStats);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;