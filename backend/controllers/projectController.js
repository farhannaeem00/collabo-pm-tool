const Project = require("../models/Project");
const Task = require("../models/Task");

const DEFAULT_COLUMNS = [
  { id: "todo", title: "To Do", order: 0 },
  { id: "inprogress", title: "In Progress", order: 1 },
  { id: "review", title: "Review", order: 2 },
  { id: "done", title: "Done", order: 3 },
];

// Create project
const createProject = async (req, res) => {
  try {
    const { name, description, color, workspaceId } = req.body;
    if (!name || !workspaceId) {
      return res.status(400).json({ message: "Name and workspace are required" });
    }

    const project = await Project.create({
      name,
      description,
      color: color || "#8b5cf6",
      workspace: workspaceId,
      members: [req.user._id],
      columns: DEFAULT_COLUMNS,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get workspace projects
const getWorkspaceProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      workspace: req.params.workspaceId,
    }).populate("members", "name email color");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single project
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("members", "name email color");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    await Task.deleteMany({ project: req.params.id });
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get project stats
const getProjectStats = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.id });
    const total = tasks.length;
    const todo = tasks.filter((t) => t.columnId === "todo").length;
    const inprogress = tasks.filter((t) => t.columnId === "inprogress").length;
    const review = tasks.filter((t) => t.columnId === "review").length;
    const done = tasks.filter((t) => t.columnId === "done").length;
    const urgent = tasks.filter((t) => t.priority === "urgent").length;

    res.json({ total, todo, inprogress, review, done, urgent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getWorkspaceProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectStats,
};