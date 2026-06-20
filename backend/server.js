const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workspaces", require("./routes/workspaceRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.json({ status: "Collabo API Running ✅" });
});

const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "https://collabo-pm-tool.vercel.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("join-project", (projectId) => socket.join(projectId));
  socket.on("task-updated", (data) => socket.to(data.projectId).emit("task-updated", data));
  socket.on("task-created", (data) => socket.to(data.projectId).emit("task-created", data));
  socket.on("task-deleted", (data) => socket.to(data.projectId).emit("task-deleted", data));
  socket.on("task-moved", (data) => socket.to(data.projectId).emit("task-moved", data));
  socket.on("disconnect", () => console.log(`User disconnected: ${socket.id}`));
});

app.set("io", io);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/workspaces", require("./routes/workspaceRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.json({ status: "Collabo API Running ✅" });
});

// Socket.io
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join-project", (projectId) => {
    socket.join(projectId);
    console.log(`User joined project: ${projectId}`);
  });

  socket.on("task-updated", (data) => {
    socket.to(data.projectId).emit("task-updated", data);
  });

  socket.on("task-created", (data) => {
    socket.to(data.projectId).emit("task-created", data);
  });

  socket.on("task-deleted", (data) => {
    socket.to(data.projectId).emit("task-deleted", data);
  });

  socket.on("task-moved", (data) => {
    socket.to(data.projectId).emit("task-moved", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Export io for use in controllers
app.set("io", io);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = server;