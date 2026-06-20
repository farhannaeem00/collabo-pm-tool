"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CommunityPage() {
  const discussions = [
    { title: "Best practices for sprint retrospectives?", replies: 23, views: "1.2K", category: "Best Practices", time: "2h ago" },
    { title: "How to integrate Collabo with GitHub Actions?", replies: 15, views: "856", category: "Integrations", time: "5h ago" },
    { title: "Tips for managing multiple projects simultaneously", replies: 31, views: "2.1K", category: "Tips & Tricks", time: "1d ago" },
    { title: "Feature request: Custom fields for tasks", replies: 45, views: "3.4K", category: "Feature Request", time: "2d ago" },
    { title: "How do you structure your workspace for a 50+ team?", replies: 28, views: "1.8K", category: "Best Practices", time: "3d ago" },
    { title: "AI subtask generation is a game changer!", replies: 52, views: "4.2K", category: "General", time: "4d ago" },
  ];

  const stats = [
    { value: "25K+", label: "Community Members" },
    { value: "12K+", label: "Discussions" },
    { value: "98%", label: "Questions Answered" },
    { value: "< 2h", label: "Average Response" },
  ];

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
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Community</p>
          <h1 className="text-5xl font-bold mb-4">Join the Collabo community</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Connect with 25,000+ teams using Collabo. Share tips, ask questions, and learn from the best.
          </p>
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded text-sm transition">
            Join Community
          </Link>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-gray-800/50">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              <p className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Discussions */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Recent Discussions</h2>
          <div className="space-y-3">
            {discussions.map((d, i) => (
              <motion.div key={d.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0D1117] border border-gray-800 hover:border-blue-500/30 rounded-xl p-5 transition cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
                        {d.category}
                      </span>
                      <span className="text-xs text-gray-500">{d.time}</span>
                    </div>
                    <h3 className="font-semibold hover:text-blue-400 transition">{d.title}</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-gray-400">{d.replies} replies</p>
                    <p className="text-xs text-gray-600">{d.views} views</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <p className="text-gray-500 text-sm">Â© 2026 Collabo. Built by <span className="text-blue-400">Farhan</span></p>
      </footer>
    </div>
  );
}
