import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (data: any) => API.post("/api/auth/register", data);
export const loginUser = (data: any) => API.post("/api/auth/login", data);
export const getProfile = () => API.get("/api/auth/profile");
export const updateProfile = (data: any) => API.put("/api/auth/profile", data);

// Workspaces
export const createWorkspace = (data: any) => API.post("/api/workspaces", data);
export const getUserWorkspaces = () => API.get("/api/workspaces");
export const getWorkspace = (id: string) => API.get(`/api/workspaces/${id}`);
export const updateWorkspace = (id: string, data: any) => API.put(`/api/workspaces/${id}`, data);
export const deleteWorkspace = (id: string) => API.delete(`/api/workspaces/${id}`);
export const inviteMember = (id: string, email: string) => API.post(`/api/workspaces/${id}/invite`, { email });

// Projects
export const createProject = (data: any) => API.post("/api/projects", data);
export const getWorkspaceProjects = (workspaceId: string) => API.get(`/api/projects/workspace/${workspaceId}`);
export const getProject = (id: string) => API.get(`/api/projects/${id}`);
export const updateProject = (id: string, data: any) => API.put(`/api/projects/${id}`, data);
export const deleteProject = (id: string) => API.delete(`/api/projects/${id}`);
export const getProjectStats = (id: string) => API.get(`/api/projects/${id}/stats`);

// Tasks
export const createTask = (data: any) => API.post("/api/tasks", data);
export const getProjectTasks = (projectId: string) => API.get(`/api/tasks/project/${projectId}`);
export const getTask = (id: string) => API.get(`/api/tasks/${id}`);
export const updateTask = (id: string, data: any) => API.put(`/api/tasks/${id}`, data);
export const deleteTask = (id: string) => API.delete(`/api/tasks/${id}`);
export const moveTask = (id: string, data: any) => API.put(`/api/tasks/${id}/move`, data);
export const addComment = (id: string, text: string) => API.post(`/api/tasks/${id}/comments`, { text });
export const toggleSubtask = (taskId: string, subtaskId: string) => API.put(`/api/tasks/${taskId}/subtasks/${subtaskId}/toggle`);
export const aiGenerateSubtasks = (id: string) => API.post(`/api/tasks/${id}/ai/subtasks`);
export const aiGenerateDescription = (title: string) => API.post("/api/tasks/ai/description", { title });
export const aiEstimateTime = (id: string) => API.post(`/api/tasks/${id}/ai/estimate`);

export default API;
