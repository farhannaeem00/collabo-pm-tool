"use client";
import { useEffect, useState, useCallback } from "react";
import {
  getProject, getProjectTasks, createTask, updateTask,
  deleteTask, moveTask, addComment, toggleSubtask,
  aiGenerateSubtasks, aiGenerateDescription, aiEstimateTime,
} from "@/lib/api";
import { getUser } from "@/lib/auth";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { connectSocket, disconnectSocket, joinProject, socket } from "@/lib/socket";

const COLUMNS = [
  { id: "todo", title: "To Do", color: "border-gray-600" },
  { id: "inprogress", title: "In Progress", color: "border-blue-500" },
  { id: "review", title: "Review", color: "border-yellow-500" },
  { id: "done", title: "Done", color: "border-green-500" },
];

const PRIORITIES = [
  { value: "low", label: "Low", color: "text-gray-400" },
  { value: "medium", label: "Medium", color: "text-blue-400" },
  { value: "high", label: "High", color: "text-yellow-400" },
  { value: "urgent", label: "Urgent", color: "text-red-400" },
];

export default function ProjectBoard() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showCreateTask, setShowCreateTask] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [comment, setComment] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [draggedTask, setDraggedTask] = useState<any>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    setUser(u);
    fetchData();

    connectSocket();
    joinProject(id as string);

    socket.on("task-created", ({ task }: any) => {
      setTasks((prev) => [...prev, task]);
    });
    socket.on("task-updated", ({ task }: any) => {
      setTasks((prev) => prev.map((t) => t._id === task._id ? task : t));
      setSelectedTask((prev: any) => prev?._id === task._id ? task : prev);
    });
    socket.on("task-deleted", ({ taskId }: any) => {
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      setSelectedTask((prev: any) => prev?._id === taskId ? null : prev);
    });
    socket.on("task-moved", ({ task }: any) => {
      setTasks((prev) => prev.map((t) => t._id === task._id ? task : t));
    });

    return () => {
      socket.off("task-created");
      socket.off("task-updated");
      socket.off("task-deleted");
      socket.off("task-moved");
      disconnectSocket();
    };
  }, [id]);

  const fetchData = async () => {
    try {
      const [projRes, tasksRes] = await Promise.all([
        getProject(id as string),
        getProjectTasks(id as string),
      ]);
      setProject(projRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      toast.error("Project not found");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const handleCreateTask = async (columnId: string) => {
    if (!newTaskTitle.trim()) return;
    try {
      await createTask({
        title: newTaskTitle,
        projectId: id,
        workspaceId: project.workspace,
        columnId,
        priority: newTaskPriority,
      });
      setNewTaskTitle("");
      setNewTaskPriority("medium");
      setShowCreateTask(null);
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setSelectedTask(null);
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim() || !selectedTask) return;
    try {
      await addComment(selectedTask._id, comment);
      setComment("");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleToggleSubtask = async (subtaskId: string) => {
    try {
      await toggleSubtask(selectedTask._id, subtaskId);
    } catch (error) {
      toast.error("Failed to update subtask");
    }
  };

  const handleAISubtasks = async () => {
    setAiLoading(true);
    try {
      const { data } = await aiGenerateSubtasks(selectedTask._id);
      setSelectedTask({ ...selectedTask, subtasks: data.subtasks });
      toast.success("AI generated subtasks!");
    } catch (error) {
      toast.error("AI failed");
    }
    setAiLoading(false);
  };

  const handleAIDescription = async () => {
    setAiLoading(true);
    try {
      const { data } = await aiGenerateDescription(selectedTask.title);
      await updateTask(selectedTask._id, { description: data.description });
      toast.success("AI generated description!");
    } catch (error) {
      toast.error("AI failed");
    }
    setAiLoading(false);
  };

  const handleAIEstimate = async () => {
    setAiLoading(true);
    try {
      const { data } = await aiEstimateTime(selectedTask._id);
      toast.success(`⏱ Estimated: ${data.hours}h — ${data.breakdown}`);
    } catch (error) {
      toast.error("AI failed");
    }
    setAiLoading(false);
  };

  // Drag and Drop
  const handleDragStart = (task: any) => setDraggedTask(task);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = async (columnId: string) => {
    if (!draggedTask || draggedTask.columnId === columnId) return;
    try {
      await moveTask(draggedTask._id, { columnId, order: 0 });
      setDraggedTask(null);
    } catch (error) {
      toast.error("Failed to move task");
    }
  };

  const getPriorityColor = (priority: string) => {
    const p = PRIORITIES.find((p) => p.value === priority);
    return p?.color || "text-gray-400";
  };

  const getPriorityEmoji = (priority: string) => {
    const emojis: any = { low: "🟢", medium: "🔵", high: "🟡", urgent: "🔴" };
    return emojis[priority] || "🔵";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Loading board...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Navbar */}
      <div className="border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur z-40">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm">← Dashboard</Link>
          <span className="text-gray-600">/</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-white text-xs"
              style={{ backgroundColor: project?.color }}>
              {project?.name?.[0]}
            </div>
            <span className="font-semibold text-sm">{project?.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">Live</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs"
              style={{ backgroundColor: user?.color }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-4 min-w-max">
          {COLUMNS.map((column) => {
            const columnTasks = tasks.filter((t) => t.columnId === column.id);
            return (
              <div
                key={column.id}
                className="w-72 shrink-0"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
              >
                {/* Column Header */}
                <div className={`flex items-center justify-between mb-3 pb-2 border-b-2 ${column.color}`}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{column.title}</h3>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button onClick={() => { setShowCreateTask(column.id); setNewTaskTitle(""); }}
                    className="text-gray-400 hover:text-white transition text-lg">+</button>
                </div>

                {/* Create Task Input */}
                {showCreateTask === column.id && (
                  <div className="bg-gray-900 border border-purple-500/30 rounded-xl p-3 mb-3">
                    <input
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleCreateTask(column.id)}
                      placeholder="Task title..."
                      autoFocus
                      className="w-full bg-gray-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none mb-2"
                    />
                    <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}
                      className="w-full bg-gray-800 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none mb-2">
                      {PRIORITIES.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button onClick={() => setShowCreateTask(null)}
                        className="flex-1 text-xs text-gray-400 hover:text-white py-1.5 rounded-lg transition">
                        Cancel
                      </button>
                      <button onClick={() => handleCreateTask(column.id)}
                        className="flex-1 text-xs bg-purple-600 hover:bg-purple-700 text-white py-1.5 rounded-lg transition">
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Tasks */}
                <div className="space-y-2">
                  {columnTasks.map((task) => (
                    <div
                      key={task._id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      onClick={() => setSelectedTask(task)}
                      className="bg-gray-900 border border-gray-800 hover:border-purple-500/30 rounded-xl p-3 cursor-pointer transition group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm font-medium leading-snug">{task.title}</p>
                        <span className="text-xs shrink-0">{getPriorityEmoji(task.priority)}</span>
                      </div>

                      {task.description && (
                        <p className="text-xs text-gray-400 line-clamp-2 mb-2">{task.description}</p>
                      )}

                      {task.subtasks?.length > 0 && (
                        <div className="mb-2">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="flex-1 bg-gray-700 rounded-full h-1">
                              <div
                                className="bg-purple-500 h-1 rounded-full"
                                style={{
                                  width: `${(task.subtasks.filter((s: any) => s.completed).length / task.subtasks.length) * 100}%`
                                }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">
                              {task.subtasks.filter((s: any) => s.completed).length}/{task.subtasks.length}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-1">
                          {task.assignees?.slice(0, 3).map((a: any) => (
                            <div key={a._id}
                              className="w-5 h-5 rounded-full border border-gray-900 flex items-center justify-center text-xs font-bold"
                              style={{ backgroundColor: a.color }}
                              title={a.name}>
                              {a.name?.[0]}
                            </div>
                          ))}
                        </div>
                        {task.dueDate && (
                          <span className="text-xs text-gray-500">
                            📅 {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                        {task.comments?.length > 0 && (
                          <span className="text-xs text-gray-500">
                            💬 {task.comments.length}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="border-2 border-dashed border-gray-800 rounded-xl p-4 text-center">
                      <p className="text-gray-600 text-xs">Drop tasks here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Detail Panel */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
          onClick={(e) => e.target === e.currentTarget && setSelectedTask(null)}>
          <div className="w-full max-w-md h-full bg-gray-900 border-l border-gray-800 overflow-y-auto">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800 sticky top-0 bg-gray-900">
              <h2 className="font-bold truncate">{selectedTask.title}</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => handleDeleteTask(selectedTask._id)}
                  className="text-red-400 hover:text-red-300 text-sm transition">🗑</button>
                <button onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-white transition">✕</button>
              </div>
            </div>

            <div className="p-4 space-y-5">
              {/* Priority + Status */}
              <div className="flex gap-3">
                <select
                  value={selectedTask.priority}
                  onChange={async (e) => {
                    await updateTask(selectedTask._id, { priority: e.target.value });
                  }}
                  className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p.value} value={p.value}>{getPriorityEmoji(p.value)} {p.label}</option>
                  ))}
                </select>
                <select
                  value={selectedTask.columnId}
                  onChange={async (e) => {
                    await moveTask(selectedTask._id, { columnId: e.target.value, order: 0 });
                  }}
                  className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
                >
                  {COLUMNS.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-gray-400 mb-2 font-semibold">DESCRIPTION</p>
                <textarea
                  defaultValue={selectedTask.description}
                  onBlur={async (e) => {
                    if (e.target.value !== selectedTask.description) {
                      await updateTask(selectedTask._id, { description: e.target.value });
                    }
                  }}
                  placeholder="Add a description..."
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* AI Actions */}
              <div>
                <p className="text-xs text-gray-400 mb-2 font-semibold">🤖 AI ACTIONS</p>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={handleAISubtasks} disabled={aiLoading}
                    className="text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 py-2 rounded-lg transition disabled:opacity-50">
                    {aiLoading ? "..." : "Generate Subtasks"}
                  </button>
                  <button onClick={handleAIDescription} disabled={aiLoading}
                    className="text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-2 rounded-lg transition disabled:opacity-50">
                    {aiLoading ? "..." : "Write Description"}
                  </button>
                  <button onClick={handleAIEstimate} disabled={aiLoading}
                    className="text-xs bg-green-500/10 hover:bg-green-500/20 text-green-400 py-2 rounded-lg transition disabled:opacity-50">
                    {aiLoading ? "..." : "Estimate Time"}
                  </button>
                </div>
              </div>

              {/* Subtasks */}
              {selectedTask.subtasks?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2 font-semibold">
                    SUBTASKS ({selectedTask.subtasks.filter((s: any) => s.completed).length}/{selectedTask.subtasks.length})
                  </p>
                  <div className="space-y-2">
                    {selectedTask.subtasks.map((subtask: any) => (
                      <div key={subtask._id}
                        className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg cursor-pointer"
                        onClick={() => handleToggleSubtask(subtask._id)}>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                          subtask.completed
                            ? "bg-purple-600 border-purple-600"
                            : "border-gray-600"
                        }`}>
                          {subtask.completed && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span className={`text-sm ${subtask.completed ? "line-through text-gray-500" : ""}`}>
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Due Date */}
              <div>
                <p className="text-xs text-gray-400 mb-2 font-semibold">DUE DATE</p>
                <input
                  type="date"
                  defaultValue={selectedTask.dueDate ? new Date(selectedTask.dueDate).toISOString().split("T")[0] : ""}
                  onChange={async (e) => {
                    await updateTask(selectedTask._id, { dueDate: e.target.value });
                  }}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Comments */}
              <div>
                <p className="text-xs text-gray-400 mb-2 font-semibold">
                  COMMENTS ({selectedTask.comments?.length || 0})
                </p>
                <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                  {selectedTask.comments?.map((c: any) => (
                    <div key={c._id} className="flex items-start gap-2 p-2 bg-gray-800 rounded-lg">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ backgroundColor: c.user?.color || "#8b5cf6" }}>
                        {c.user?.name?.[0]}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">{c.user?.name}</p>
                        <p className="text-sm">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                  />
                  <button onClick={handleAddComment}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition text-sm">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
