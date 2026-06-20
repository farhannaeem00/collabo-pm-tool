"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <nav className="border-b border-gray-800/50 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="text-lg font-bold">Collabo</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white px-3 py-1.5">Log in</Link>
          <Link href="/signup" className="text-sm bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded transition">Get it free</Link>
        </div>
      </nav>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Solutions → Design</p>
            <h1 className="text-5xl font-bold mb-6">For design teams that move fast</h1>
            <p className="text-gray-400 text-xl mb-10 max-w-2xl">
              From wireframes to final handoff — keep design work organized, reviewed, and shipped on time.
            </p>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded text-sm transition">
              Start free →
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: "🎨", title: "Figma Integration", desc: "Attach Figma designs directly to tasks. Keep specs and designs always in context." },
              { icon: "✅", title: "Design Reviews", desc: "Structured review workflows to get faster approvals from stakeholders." },
              { icon: "📁", title: "Asset Management", desc: "Organize design assets, style guides, and brand files in one place." },
            ].map((f) => (
              <div key={f.title} className="bg-[#0D1117] border border-gray-800 rounded-xl p-6">
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-6 text-center">
        <p className="text-gray-500 text-sm">© 2026 Collabo. Built by <span className="text-blue-400">Farhan</span></p>
      </footer>
    </div>
  );
}
