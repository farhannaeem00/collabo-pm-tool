const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://collabo-pm-tool.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    "https://collabo-pm-tool.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());

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