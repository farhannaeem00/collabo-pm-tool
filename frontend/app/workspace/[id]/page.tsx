"use client";
import { useEffect, useState } from "react";
import { getWorkspace, getWorkspaceProjects, createProject, deleteProject, inviteMember } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function WorkspacePage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [workspace, setWorkspace] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#8b5cf6");
  const [inviteEmail, setInviteEmail] = useState("");
  const [creating, setCreating] = useState(false);

  const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    setUser(u);
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [wsRes, projRes] = await Promise.all([
        getWorkspace(id as string),
        getWorkspaceProjects(id as string),
      ]);
      setWorkspace(wsRes.data);
      setProjects(projRes.data);
    } catch (error) {
      toast.error("Workspace not found");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const handleCreateProject = async () => {
    if (!name.trim()) { toast.error("Project name is required"); return; }
    setCreating(true);
    try {
      const { data } = await createProject({ name, description, color, workspaceId: id });
      setProjects([...projects, data]);
      setName(""); setDescription(""); setColor("#8b5cf6");
      setShowCreate(false);
      toast.success("Project created!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create project");
    }
    setCreating(false);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter((p) => p._id !== projectId));
      toast.success("Project deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim()) { toast.error("Email is required"); return; }
    try {
      await inviteMember(id as string, inviteEmail);
      toast.success("Member invited!");
      setInviteEmail("");
      setShowInvite(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to invite");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Loading workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur z-40">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition text-sm">← Dashboard</Link>
          <span className="text-gray-600">/</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-white text-xs"
              style={{ backgroundColor: workspace?.color }}>
              {workspace?.name?.[0]}
            </div>
            <span className="font-semibold">{workspace?.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowInvite(true)}
            className="text-sm border border-gray-700 hover:border-purple-500 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition">
            + Invite
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs"
              style={{ backgroundColor: user?.color }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{workspace?.name}</h1>
            <p className="text-gray-400 mt-1">{workspace?.description || "No description"}</p>
            <div className="flex items-center gap-2 mt-2">
              {workspace?.members?.slice(0, 5).map((m: any) => (
                <div key={m._id || m.user?._id}
                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs border-2 border-gray-950"
                  style={{ backgroundColor: m.user?.color || "#8b5cf6" }}
                  title={m.user?.name}>
                  {m.user?.name?.[0]?.toUpperCase()}
                </div>
              ))}
              <span className="text-xs text-gray-400 ml-1">
                {workspace?.members?.length} member{workspace?.members?.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-lg transition">
            + New Project
          </button>
        </div>

        {/* Modals */}
        {(showCreate || showInvite) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
              {showCreate ? (
                <>
                  <h2 className="font-bold text-lg mb-4">Create Project</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Name *</label>
                      <input value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="My Project"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Description</label>
                      <input value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="What is this project about?"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Color</label>
                      <div className="flex gap-2">
                        {COLORS.map((c) => (
                          <button key={c} onClick={() => setColor(c)}
                            className={`w-8 h-8 rounded-full border-2 transition ${color === c ? "border-white scale-110" : "border-transparent"}`}
                            style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setShowCreate(false)}
                        className="flex-1 border border-gray-700 text-gray-400 py-2.5 rounded-lg transition">Cancel</button>
                      <button onClick={handleCreateProject} disabled={creating}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50">
                        {creating ? "Creating..." : "Create"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-bold text-lg mb-4">Invite Member</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Email Address</label>
                      <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="colleague@example.com"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500" />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setShowInvite(false)}
                        className="flex-1 border border-gray-700 text-gray-400 py-2.5 rounded-lg transition">Cancel</button>
                      <button onClick={handleInvite}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition">
                        Invite
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📋</p>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-gray-400 mb-6">Create your first project to start managing tasks</p>
            <button onClick={() => setShowCreate(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition">
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project._id}
                className="bg-gray-900 border border-gray-800 hover:border-purple-500/30 rounded-2xl p-6 transition group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-xl"
                    style={{ backgroundColor: project.color }}>
                    {project.name[0].toUpperCase()}
                  </div>
                  <button onClick={() => handleDeleteProject(project._id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition text-sm">
                    🗑
                  </button>
                </div>
                <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description || "No description"}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                  <Link href={`/project/${project._id}`}
                    className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg transition">
                    Open Board →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
