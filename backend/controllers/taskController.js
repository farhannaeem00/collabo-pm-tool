const Task = require("../models/Task");
const {
  generateSubtasks,
  generateTaskDescription,
  estimateTime,
} = require("../utils/groqService");

// Create task
const createTask = async (req, res) => {
  try {
    const {
      title, description, projectId, workspaceId,
      columnId, assignees, priority, dueDate, tags,
    } = req.body;

    if (!title || !projectId || !workspaceId || !columnId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const tasksInColumn = await Task.countDocuments({
      project: projectId,
      columnId,
    });

    const task = await Task.create({
      title,
      description: description || "",
      project: projectId,
      workspace: workspaceId,
      columnId,
      assignees: assignees || [],
      priority: priority || "medium",
      dueDate: dueDate || null,
      tags: tags || [],
      order: tasksInColumn,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignees", "name email color");

    // Emit real-time event
    const io = req.app.get("io");
    io.to(projectId).emit("task-created", { task: populatedTask, projectId });

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get project tasks
const getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate("assignees", "name email color")
      .sort({ order: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single task
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignees", "name email color")
      .populate("comments.user", "name color");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("assignees", "name email color");

    const io = req.app.get("io");
    io.to(task.project.toString()).emit("task-updated", {
      task,
      projectId: task.project.toString(),
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    const io = req.app.get("io");
    io.to(task.project.toString()).emit("task-deleted", {
      taskId: req.params.id,
      projectId: task.project.toString(),
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Move task (drag and drop)
const moveTask = async (req, res) => {
  try {
    const { columnId, order } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { columnId, order },
      { new: true }
    ).populate("assignees", "name email color");

    const io = req.app.get("io");
    io.to(task.project.toString()).emit("task-moved", {
      task,
      projectId: task.project.toString(),
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add comment
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const task = await Task.findById(req.params.id);
    task.comments.push({ user: req.user._id, text });
    await task.save();

    const updatedTask = await Task.findById(req.params.id)
      .populate("comments.user", "name color");

    const io = req.app.get("io");
    io.to(task.project.toString()).emit("task-updated", {
      task: updatedTask,
      projectId: task.project.toString(),
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle subtask
const toggleSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const subtask = task.subtasks.id(req.params.subtaskId);
    subtask.completed = !subtask.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AI — Generate subtasks
const aiGenerateSubtasks = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const subtasks = await generateSubtasks(task.title, task.description);

    task.subtasks = subtasks.map((title) => ({ title, completed: false }));
    await task.save();

    res.json({ subtasks: task.subtasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AI — Generate description
const aiGenerateDescription = async (req, res) => {
  try {
    const { title } = req.body;
    const description = await generateTaskDescription(title);
    res.json({ description });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// AI — Estimate time
const aiEstimateTime = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const subtaskTitles = task.subtasks.map((s) => s.title);
    const estimate = await estimateTime(task.title, subtaskTitles);
    res.json(estimate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};