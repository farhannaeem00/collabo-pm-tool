const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  color: { type: String, default: "#8b5cf6" },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  columns: [{
    id: String,
    title: String,
    order: Number,
  }],
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);