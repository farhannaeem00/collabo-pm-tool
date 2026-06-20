"use client";
import { useEffect, useState } from "react";
import { getUserWorkspaces, createWorkspace, deleteWorkspace } from "@/lib/api";
import { getUser, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#8b5cf6");
  const [creating, setCreating] = useState(false);

  const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

  useEffect(() => {
    const u = getUser();
    if (!u) { router.push("/login"); return; }
    setUser(u);
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const { data } = await getUserWorkspaces();
      setWorkspaces(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!name.trim()) { toast.error("Workspace name is required"); return; }
    setCreating(true);
    try {
      const { data } = await createWorkspace({ name, description, color });
      setWorkspaces([...workspaces, data]);
      setName(""); setDescription(""); setColor("#8b5cf6");
      setShowCreate(false);
      toast.success("Workspace created!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create workspace");
    }
    setCreating(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWorkspace(id);
      setWorkspaces(workspaces.filter((w) => w._id !== id));
      toast.success("Workspace deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">C</div>
          <span className="text-xl font-bold">Colla<span className="text-purple-400">bo</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
              style={{ backgroundColor: user?.color }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm text-gray-400">{user?.name}</span>
          </div>
          <button onClick={() => { removeToken(); router.push("/login"); }}
            className="text-sm text-gray-400 hover:text-white transition">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Workspaces</h1>
            <p className="text-gray-400 mt-1">Manage your projects and teams</p>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-lg transition">
            + New Workspace
          </button>
        </div>

        {/* Create Workspace Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
              <h2 className="font-bold text-lg mb-4">Create Workspace</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Name *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="My Workspace"
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description</label>
                  <input value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this workspace for?"
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
                    className="flex-1 border border-gray-700 text-gray-400 hover:text-white py-2.5 rounded-lg transition">
                    Cancel
                  </button>
                  <button onClick={handleCreate} disabled={creating}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50">
                    {creating ? "Creating..." : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workspaces Grid */}
        {workspaces.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🏗️</p>
            <h3 className="text-xl font-semibold mb-2">No workspaces yet</h3>
            <p className="text-gray-400 mb-6">Create your first workspace to get started</p>
            <button onClick={() => setShowCreate(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition">
              Create Workspace
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workspaces.map((ws) => (
              <div key={ws._id}
                className="bg-gray-900 border border-gray-800 hover:border-purple-500/30 rounded-2xl p-6 transition group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-xl"
                    style={{ backgroundColor: ws.color }}>
                    {ws.name[0].toUpperCase()}
                  </div>
                  <button onClick={() => handleDelete(ws._id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition text-sm">
                    🗑
                  </button>
                </div>
                <h3 className="font-bold text-lg mb-1">{ws.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{ws.description || "No description"}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {ws.members?.length} member{ws.members?.length !== 1 ? "s" : ""}
                  </p>
                  <Link href={`/workspace/${ws._id}`}
                    className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg transition">
                    Open →
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
