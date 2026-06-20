"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TutorialsPage() {
  const tutorials = [
    { emoji: "🎬", title: "Getting started with Collabo", duration: "5:32", level: "Beginner", views: "45K" },
    { emoji: "📋", title: "Setting up your first kanban board", duration: "8:14", level: "Beginner", views: "38K" },
    { emoji: "🤖", title: "Using AI features to boost productivity", duration: "12:05", level: "Intermediate", views: "29K" },
    { emoji: "⚡", title: "Real-time collaboration best practices", duration: "9:47", level: "Intermediate", views: "22K" },
    { emoji: "📊", title: "Advanced sprint planning and reporting", duration: "15:30", level: "Advanced", views: "18K" },
    { emoji: "🔗", title: "Setting up GitHub integration", duration: "7:20", level: "Intermediate", views: "31K" },
    { emoji: "👥", title: "Managing large teams with workspaces", duration: "11:15", level: "Advanced", views: "14K" },
    { emoji: "🎯", title: "OKR tracking with Collabo roadmaps", duration: "13:42", level: "Advanced", views: "12K" },
  ];

  const levelColors: any = {
    Beginner: "bg-green-500/10 text-green-400",
    Intermediate: "bg-yellow-500/10 text-yellow-400",
    Advanced: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <nav className="border-b border-gray-800/50 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-lg font-bold">Collabo</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white px-3 py-1.5 transition">Log in</Link>
          <Link href="/signup" className="text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition">Get it free</Link>
        </div>
      </nav>

      <section className="py-16 px-6 text-center border-b border-gray-800/50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Tutorials</p>
          <h1 className="text-5xl font-bold mb-4">Learn Collabo step by step</h1>
          <p className="text-gray-400 text-lg">Video tutorials for every skill level. From beginner to power user.</p>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tutorials.map((tutorial, i) => (
            <motion.div key={tutorial.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0D1117] border border-gray-800 hover:border-blue-500/30 rounded-xl overflow-hidden transition group cursor-pointer">
              <div className="bg-gray-800 h-36 flex items-center justify-center relative">
                <span className="text-5xl">{tutorial.emoji}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    ▶
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded">
                  {tutorial.duration}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${levelColors[tutorial.level]}`}>
                    {tutorial.level}
                  </span>
                </div>
                <h3 className="font-semibold text-sm leading-snug mb-2">{tutorial.title}</h3>
                <p className="text-gray-500 text-xs">{tutorial.views} views</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <p className="text-gray-500 text-sm">© 2026 Collabo. Built by <span className="text-blue-400">Farhan</span></p>
      </footer>
    </div>
  );
}
