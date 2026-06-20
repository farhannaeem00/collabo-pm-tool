const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
  columnId: { type: String, required: true },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
  dueDate: { type: Date, default: null },
  order: { type: Number, default: 0 },
  tags: [{ type: String }],
  subtasks: [{
    title: String,
    completed: { type: Boolean, default: false },
  }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: { type: Date, default: Date.now },
  }],
  aiGenerated: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);