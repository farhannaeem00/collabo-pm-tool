const express = require("express");
const router = express.Router();
const {
  createWorkspace,
  getUserWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
  inviteMember,
} = require("../controllers/workspaceController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", createWorkspace);
router.get("/", getUserWorkspaces);
router.get("/:id", getWorkspace);
router.put("/:id", updateWorkspace);
router.delete("/:id", deleteWorkspace);
router.post("/:id/invite", inviteMember);

module.exports = router;