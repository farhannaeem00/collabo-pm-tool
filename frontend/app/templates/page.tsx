"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TemplatesPage() {
  const templates = [
    { icon: "âš™ï¸", title: "Software Development", desc: "Full agile workflow with sprints, backlog, and release tracking.", category: "Engineering", users: "125K+" },
    { icon: "ðŸŽ¨", title: "Product Design", desc: "Track design tasks from wireframe to final handoff seamlessly.", category: "Design", users: "89K+" },
    { icon: "ðŸš€", title: "Product Launch", desc: "Coordinate cross-functional teams for successful product launches.", category: "Product", users: "67K+" },
    { icon: "ðŸ›", title: "Bug Tracking", desc: "Capture, prioritize, and resolve bugs faster with clear workflows.", category: "Engineering", users: "98K+" },
    { icon: "ðŸ“£", title: "Marketing Campaign", desc: "Plan and execute marketing campaigns from ideation to reporting.", category: "Marketing", users: "45K+" },
    { icon: "ðŸ”§", title: "IT Service Management", desc: "Handle IT requests, incidents, and changes with ITIL best practices.", category: "IT", users: "72K+" },
    { icon: "ðŸ“±", title: "Mobile App Development", desc: "iOS and Android app development with platform-specific workflows.", category: "Engineering", users: "56K+" },
    { icon: "ðŸ“Š", title: "OKR Tracking", desc: "Set, track, and achieve objectives and key results across teams.", category: "Strategy", users: "34K+" },
    { icon: "ðŸ¤", title: "Sales Pipeline", desc: "Track deals, manage leads, and forecast revenue with clarity.", category: "Sales", users: "41K+" },
  ];

  const categories = ["All", "Engineering", "Design", "Product", "Marketing", "IT", "Strategy", "Sales"];

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

      <section className="py-20 px-6 text-center border-b border-gray-800/50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Templates</p>
          <h1 className="text-5xl font-bold mb-4">Start faster with templates</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pre-built workflows for every team. Get up and running in minutes, not days.
          </p>
        </motion.div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button key={cat}
                className="text-sm px-4 py-2 rounded-full border border-gray-700 hover:border-blue-500 text-gray-400 hover:text-white transition">
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {templates.map((template, i) => (
              <motion.div key={template.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0D1117] border border-gray-800 hover:border-blue-500/30 rounded-xl p-6 transition group">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{template.icon}</span>
                  <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-400 transition">{template.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{template.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Used by {template.users} teams</span>
                  <Link href="/signup"
                    className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded transition">
                    Use Template
                  </Link>
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
