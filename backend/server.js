const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS — must be first
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

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

// Socket.io only in development
if (process.env.NODE_ENV !== "production") {
  const http = require("http");
  const { Server } = require("socket.io");
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
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
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;