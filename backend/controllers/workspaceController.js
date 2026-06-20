const Workspace = require("../models/Workspace");
const Project = require("../models/Project");
const User = require("../models/User");

// Create workspace
const createWorkspace = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const workspace = await Workspace.create({
      name,
      description,
      color: color || "#8b5cf6",
      owner: req.user._id,
      members: [{ user: req.user._id, role: "owner" }],
    });

    res.status(201).json(workspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user workspaces
const getUserWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      "members.user": req.user._id,
    }).populate("owner", "name email color");

    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single workspace
const getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id)
      .populate("owner", "name email color")
      .populate("members.user", "name email color");

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update workspace
const updateWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete workspace
const deleteWorkspace = async (req, res) => {
  try {
    await Workspace.findByIdAndDelete(req.params.id);
    await Project.deleteMany({ workspace: req.params.id });
    res.json({ message: "Workspace deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Invite member
const inviteMember = async (req, res) => {
  try {
    const { email } = req.body;
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMember = workspace.members.find(
      (m) => m.user.toString() === user._id.toString()
    );
    if (isMember) return res.status(400).json({ message: "User already a member" });

    workspace.members.push({ user: user._id, role: "member" });
    await workspace.save();

    res.json({ message: "Member invited successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createWorkspace,
  getUserWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
  inviteMember,
};